import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeCollection } from "@/lib/serializers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      media: { orderBy: { sortOrder: "asc" } },
      characters: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: { rarityTier: true, media: { orderBy: { sortOrder: "asc" } } },
      },
      products: {
        orderBy: { sortOrder: "asc" },
        include: { media: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  return NextResponse.json({ collection: serializeCollection(collection) });
}
