import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { products: { where: { status: "ACTIVE" } } } } },
    });
    if (!category) return apiError("Category not found", 404);
    return apiSuccess(category);
  } catch (err) {
    console.error("[Category Slug GET]", err);
    return apiError("Internal server error", 500);
  }
}
