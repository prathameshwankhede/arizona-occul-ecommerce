import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

const updateOrderSchema = z.object({
  orderStatus: z.enum(["PENDING","CONFIRMED","PROCESSING","SHIPPED","DELIVERED","CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING","COD","PAID","FAILED","REFUNDED"]).optional(),
});

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        orderItems: { include: { product: { select: { id: true, name: true, image: true, slug: true } } } },
      },
    });
    if (!order) return apiError("Order not found", 404);
    return apiSuccess(order);
  } catch (err) { return handleApiError(err); }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = updateOrderSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });
    return apiSuccess(order, "Order updated");
  } catch (err) { return handleApiError(err); }
}
