import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const service = await prisma.service.findUnique({ where: { slug } });
    if (!service || service.status === "INACTIVE") {
      return apiError("Service not found", 404);
    }
    return apiSuccess(service);
  } catch (err) {
    console.error("[Service Slug GET]", err);
    return apiError("Internal server error", 500);
  }
}
