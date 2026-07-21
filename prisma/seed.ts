import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Rarity tiers — pull probabilities are TBD (not yet decided/disclosed),
  // left null until product/legal settles the actual odds.
  const [common, rare, secret] = await Promise.all([
    prisma.rarityTier.upsert({
      where: { slug: "common" },
      update: {},
      create: { slug: "common", name: "Common", sortOrder: 0 },
    }),
    prisma.rarityTier.upsert({
      where: { slug: "rare" },
      update: {},
      create: { slug: "rare", name: "Rare", sortOrder: 1 },
    }),
    prisma.rarityTier.upsert({
      where: { slug: "secret" },
      update: {},
      create: { slug: "secret", name: "Moonlit Rare (Secret)", sortOrder: 2 },
    }),
  ]);

  const collection = await prisma.collection.upsert({
    where: { slug: "creatures-of-myth" },
    update: {},
    create: {
      slug: "creatures-of-myth",
      seriesNumber: 1,
      title: "Creatures of Myth",
      eyebrow: "Lil Imps × Teeny Fables",
      intro:
        "Meet the Lil Imps in our first blind box collection—a small gathering of curious creatures inspired by old myths and moonlit woods.",
      storyNote: "one moonlit rare hides in every case",
      status: "COMING_SOON",
    },
  });

  const product = await prisma.product.upsert({
    where: { slug: "creatures-of-myth-blind-box" },
    update: {},
    create: {
      collectionId: collection.id,
      slug: "creatures-of-myth-blind-box",
      name: "Creatures of Myth blind box",
      description:
        "One sealed blind box. Character selection is a surprise—even to the forest.",
      price: 16.0,
      currency: "USD",
      availability: "COMING_SOON",
    },
  });

  const characters: {
    displayNumber: string;
    name: string;
    nature: string;
    symbol: string;
    rarityTierId: string;
    sortOrder: number;
  }[] = [
    {
      displayNumber: "No. 01",
      name: "Mosskin",
      nature: "Keeper of tiny things",
      symbol: "♠",
      rarityTierId: common.id,
      sortOrder: 0,
    },
    {
      displayNumber: "No. 02",
      name: "Morrow",
      nature: "Dreamer under roots",
      symbol: "☽",
      rarityTierId: common.id,
      sortOrder: 1,
    },
    {
      displayNumber: "No. 03",
      name: "Thimble",
      nature: "Collector of wishes",
      symbol: "✦",
      rarityTierId: rare.id,
      sortOrder: 2,
    },
  ];

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: { collectionId: collection.id, displayNumber: char.displayNumber },
      select: { id: true },
    });
    if (existing) {
      await prisma.character.update({ where: { id: existing.id }, data: char });
    } else {
      await prisma.character.create({ data: { ...char, collectionId: collection.id } });
    }
  }

  const galleryMedia = [
    {
      url: "/img/creaturesofmyth/lilimpsdisplayfull copy.jpg",
      altText: "Creatures of Myth Lil Imps retail display",
      caption: "The collection",
      sortOrder: 0,
    },
    {
      url: "/img/creaturesofmyth/boxes.jpg",
      altText: "Creatures of Myth blind box packaging",
      caption: "The mystery box",
      sortOrder: 1,
    },
    {
      url: "/img/creaturesofmyth/LilImps_Werewolf.png",
      altText: "Lil Imps werewolf character concept",
      caption: "Werewolf sighting",
      sortOrder: 2,
    },
    {
      url: "/img/creaturesofmyth/LilImps_BaseDesign_Sitting.png",
      altText: "Seated Lil Imp character concept",
      caption: "Base character study",
      sortOrder: 3,
    },
  ];

  for (const media of galleryMedia) {
    const existing = await prisma.mediaAsset.findFirst({
      where: { collectionId: collection.id, url: media.url },
      select: { id: true },
    });
    if (!existing) {
      await prisma.mediaAsset.create({
        data: { ...media, collectionId: collection.id },
      });
    }
  }

  const existingProductMedia = await prisma.mediaAsset.findFirst({
    where: { productId: product.id, url: "/img/creaturesofmyth/boxes.jpg" },
    select: { id: true },
  });
  if (!existingProductMedia) {
    await prisma.mediaAsset.create({
      data: {
        url: "/img/creaturesofmyth/boxes.jpg",
        altText: "Creatures of Myth blind box packaging",
        caption: "The mystery box",
        sortOrder: 0,
        productId: product.id,
      },
    });
  }

  console.log(`Seeded collection "${collection.title}" with ${characters.length} characters.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
