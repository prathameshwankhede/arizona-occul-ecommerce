import prisma from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { status: "ACTIVE" },
      orderBy: { name: "asc" },
      include: { _count: { select: { products: { where: { status: "ACTIVE" } } } } },
    });
    return apiSuccess(categories);
  } catch (err) {
    console.error("[Categories GET]", err);
    return apiError("Internal server error", 500);
  }
}
