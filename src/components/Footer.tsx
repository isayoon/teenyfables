import Link from "next/link";
import en from "@/translations/en";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <span className="footer-logo">{en.navigation.brand}</span>
        <p>{en.footer.tagline}</p>
      </div>
      <div className="footer-links">
        <Link href="/shop">{en.navigation.shop}</Link>
        <a href="mailto:teenyfables@gmail.com">{en.footer.contact}</a>
      </div>
      <p className="footer-note">{en.footer.note}</p>
      <div className="footer-socials">
        <a
          href="https://www.instagram.com/teenyfables/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={en.footer.instagram}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.25" />
            <circle className="social-dot" cx="17.4" cy="6.7" r="1" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@teenyfables"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={en.footer.tiktok}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.2 3v11.1a4.6 4.6 0 1 1-3.6-4.5v3.1a1.7 1.7 0 1 0 .7 1.4V3h2.9c.3 2.3 1.8 3.8 4.3 4.1v3a8.3 8.3 0 0 1-4.3-1.5" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
