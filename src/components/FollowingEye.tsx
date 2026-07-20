"use client";

import { useEffect, useRef } from "react";

export function FollowingEye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (!eye || !pupil || reducedMotion.matches || coarsePointer.matches) {
      return;
    }

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      pupil.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const followPointer = (event: PointerEvent) => {
      const bounds = eye.getBoundingClientRect();
      const deltaX = event.clientX - (bounds.left + bounds.width / 2);
      const deltaY = event.clientY - (bounds.top + bounds.height / 2);
      const angle = Math.atan2(deltaY, deltaX);
      const strength = Math.min(Math.hypot(deltaX, deltaY) / 140, 1);

      targetX = Math.cos(angle) * 18 * strength;
      targetY = Math.sin(angle) * 4 * strength;
    };

    const centerPupil = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    document.addEventListener("mouseleave", centerPupil);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", followPointer);
      document.removeEventListener("mouseleave", centerPupil);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-eye" aria-hidden="true" ref={eyeRef}>
      <span ref={pupilRef} />
    </div>
  );
}
