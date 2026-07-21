import type {
  Collection,
  Character,
  Product,
  RarityTier,
  MediaAsset,
} from "@/generated/prisma/client";

function serializeMedia(media: MediaAsset) {
  return {
    id: media.id,
    url: media.url,
    altText: media.altText,
    caption: media.caption,
    sortOrder: media.sortOrder,
  };
}

function serializeRarityTier(tier: RarityTier) {
  return {
    id: tier.id,
    slug: tier.slug,
    name: tier.name,
    pullProbability: tier.pullProbability ? Number(tier.pullProbability) : null,
  };
}

export function serializeCharacter(
  character: Character & { rarityTier?: RarityTier | null; media?: MediaAsset[] }
) {
  return {
    id: character.id,
    displayNumber: character.displayNumber,
    name: character.name,
    nature: character.nature,
    symbol: character.symbol,
    lore: character.lore,
    sortOrder: character.sortOrder,
    rarityTier: character.rarityTier ? serializeRarityTier(character.rarityTier) : null,
    media: character.media?.map(serializeMedia) ?? [],
  };
}

export function serializeProduct(
  product: Product & { media?: MediaAsset[] }
) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    currency: product.currency,
    availability: product.availability,
    sortOrder: product.sortOrder,
    media: product.media?.map(serializeMedia) ?? [],
  };
}

export function serializeCollection(
  collection: Collection & {
    characters?: (Character & { rarityTier?: RarityTier | null; media?: MediaAsset[] })[];
    products?: (Product & { media?: MediaAsset[] })[];
    media?: MediaAsset[];
  }
) {
  return {
    id: collection.id,
    slug: collection.slug,
    seriesNumber: collection.seriesNumber,
    title: collection.title,
    eyebrow: collection.eyebrow,
    intro: collection.intro,
    storyNote: collection.storyNote,
    status: collection.status,
    releaseDate: collection.releaseDate,
    media: collection.media?.map(serializeMedia) ?? [],
    characters: collection.characters?.map(serializeCharacter) ?? [],
    products: collection.products?.map(serializeProduct) ?? [],
  };
}
