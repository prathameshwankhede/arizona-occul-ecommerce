import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const payload = await requireAuth();

    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: {
        orderItems: {
          include: { product: { select: { id: true, name: true, image: true, slug: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(orders);
  } catch (err) {
    return handleApiError(err);
  }
}
