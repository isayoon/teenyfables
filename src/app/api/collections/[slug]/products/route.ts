import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/serializers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  const products = await prisma.product.findMany({
    where: { collectionId: collection.id },
    orderBy: { sortOrder: "asc" },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json({ products: products.map(serializeProduct) });
}
