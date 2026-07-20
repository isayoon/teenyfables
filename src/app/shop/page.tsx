import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import en from "@/translations/en";

export const metadata: Metadata = {
  title: en.shop.metaTitle,
  description: en.shop.metaDescription,
};

const galleryImages = [
  "/img/creaturesofmyth/lilimpsdisplayfull copy.jpg",
  "/img/creaturesofmyth/boxes.jpg",
  "/img/creaturesofmyth/LilImps_Werewolf.png",
  "/img/creaturesofmyth/LilImps_BaseDesign_Sitting.png",
];

export default function ShopPage() {
  return (
    <>
      <main className="inner-page shop-page">
        <section className="shop-hero">
          <div>
            <p className="eyebrow">{en.shop.series}</p>
            <h1>{en.shop.title}</h1>
          </div>
          <p>{en.shop.intro}</p>
        </section>

        <section className="featured-box">
          <div className="featured-product-image">
            <Image
              src="/img/creaturesofmyth/boxes.jpg"
              alt={en.shop.gallery[1].alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="featured-copy">
            <p className="eyebrow">{en.shop.boxEyebrow}</p>
            <h2>{en.shop.boxTitle}</h2>
            <p className="price">{en.shop.price} <span>{en.shop.availability}</span></p>
            <p>{en.shop.boxDescription}</p>
            <button className="button button-muted" disabled>{en.shop.disabledCta}</button>
            <small>{en.shop.checkoutNote}</small>
          </div>
        </section>

        <section className="collection-section">
          <div className="collection-heading">
            <div><p className="eyebrow">{en.shop.guideEyebrow}</p><h2>{en.shop.guideTitle}</h2></div>
            <p>{en.shop.guideCount}</p>
          </div>
          <div className="collection-gallery">
            {en.shop.gallery.map((item, index) => (
              <figure className={`gallery-item gallery-item-${index + 1}`} key={item.alt}>
                <div className="gallery-image">
                  <Image
                    src={galleryImages[index]}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 45vw"
                  />
                </div>
                <figcaption><span>0{index + 1}</span>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
