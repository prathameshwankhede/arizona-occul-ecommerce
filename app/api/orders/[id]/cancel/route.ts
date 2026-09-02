import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireAuth();
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: { id: parseInt(id), userId: payload.userId },
    });

    if (!order) return apiError("Order not found", 404);

    if (!["PENDING", "CONFIRMED"].includes(order.orderStatus)) {
      return apiError("Order cannot be cancelled at this stage", 409);
    }

    const updated = await prisma.order.update({
      where: { id: order.id },
      data: { orderStatus: "CANCELLED" },
    });

    return apiSuccess(updated, "Order cancelled successfully");
  } catch (err) {
    return handleApiError(err);
  }
}
