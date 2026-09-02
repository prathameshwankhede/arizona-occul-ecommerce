import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireAuth();
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: { id: parseInt(id), userId: payload.userId },
      include: {
        orderItems: {
          include: { product: { select: { id: true, name: true, image: true, slug: true } } },
        },
      },
    });

    if (!order) return apiError("Order not found", 404);
    return apiSuccess(order);
  } catch (err) {
    return handleApiError(err);
  }
}
