import Image from "next/image";
import Link from "next/link";
import en from "@/translations/en";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={en.navigation.homeLabel}>
        <Image
          className="brand-logo"
          src="/img/icon.png"
          alt=""
          width={38}
          height={38}
          priority
        />
        <span>{en.navigation.brand}</span>
      </Link>

      <Link className="nav-cta" href="/shop">
        {en.navigation.shop}
      </Link>
    </header>
  );
}
