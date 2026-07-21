import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { FollowingEye } from "@/components/FollowingEye";

export default function Home() {
  return (
    <>
      <main>
        <section className="concept-hero" id="welcome">
          <div className="concept-hero-art" aria-hidden="true" />
          <div className="concept-hero-copy">
            <p className="eyebrow">Lil Imps × Teeny Fables</p>
            <h1 className="typing-title">Teeny Fables</h1>
            <FollowingEye />
            <p>Small myths are hiding in the dark.</p>
            <Link className="text-link" href="/shop">
              Enter the collection <span>↘</span>
            </Link>
          </div>
          <a className="scroll-mark" href="#collection" aria-label="Scroll to collection">
            <span />
          </a>
        </section>

        <section className="concept-collection" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Shop</p>
              <h2>Current collection</h2>
            </div>
            <p>One world. One mystery box. Many possible myths.</p>
          </div>

          <Link className="collection-card" href="/shop">
            <div className="collection-card-image">
              <Image
                src="/img/creaturesofmyth/lilimpsdisplayfull copy.jpg"
                alt="Creatures of Myth Lil Imps collection display"
                fill
                sizes="(max-width: 800px) 100vw, 70vw"
              />
            </div>
            <div className="collection-card-copy">
              <span>Collection 01</span>
              <h3>Creatures of Myth</h3>
              <p>Explore the collection ↗</p>
            </div>
          </Link>
        </section>

        <section className="concept-about" id="about">
          <div className="concept-about-copy">
            <p className="eyebrow">About</p>
            <h2>Tiny worlds hidden in plain sight
                <br />Every creature has a secret</h2>
            <p>
              Teeny Fables makes small collectible worlds inspired by folklore,
              shadows, and the things you almost see in the woods.
            </p>
          </div>
          <div className="concept-about-character">
            <Image
              src="/img/creaturesofmyth/LilImps_BaseDesign_Peeking.png"
              alt="A Lil Imp peeking into the scene"
              width={819}
              height={1017}
              sizes="(max-width: 600px) 72vw, 38vw"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
