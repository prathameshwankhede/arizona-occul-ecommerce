import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!product || product.status === "INACTIVE") {
      return apiError("Product not found", 404);
    }

    // Related products (same category, exclude current)
    const related = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        status: "ACTIVE",
        id: { not: product.id },
      },
      take: 4,
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    return apiSuccess({ product, related });
  } catch (err) {
    console.error("[Product Slug GET]", err);
    return apiError("Internal server error", 500);
  }
}
