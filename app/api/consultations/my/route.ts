import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const payload = await requireAuth();

    const consultations = await prisma.consultation.findMany({
      where: { userId: payload.userId },
      include: { service: { select: { id: true, name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(consultations);
  } catch (err) {
    return handleApiError(err);
  }
}
