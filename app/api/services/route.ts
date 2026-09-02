import prisma from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { status: "ACTIVE" },
      orderBy: { sortOrder: "asc" },
    });
    return apiSuccess(services);
  } catch (err) {
    console.error("[Services GET]", err);
    return apiError("Internal server error", 500);
  }
}
