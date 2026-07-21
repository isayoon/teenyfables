import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeCollection } from "@/lib/serializers";

// Public catalog is anything that's been published, i.e. not a draft
// still being put together.
const PUBLIC_STATUSES = ["COMING_SOON", "ACTIVE", "ARCHIVED"] as const;

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");

  const collections = await prisma.collection.findMany({
    where: status
      ? { status: status as (typeof PUBLIC_STATUSES)[number] }
      : { status: { in: [...PUBLIC_STATUSES] } },
    orderBy: { seriesNumber: "asc" },
    include: {
      media: { orderBy: { sortOrder: "asc" } },
    },
  });

  return NextResponse.json({
    collections: collections.map(serializeCollection),
  });
}
