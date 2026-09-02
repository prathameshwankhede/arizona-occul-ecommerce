import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

const updateSchema = z.object({ quantity: z.number().int().min(1).max(99) });

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireAuth();
    const { id } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: parseInt(id), userId: payload.userId },
    });

    if (!cartItem) return apiError("Cart item not found", 404);

    const updated = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: parsed.data.quantity },
      include: { product: true },
    });

    return apiSuccess(updated, "Cart updated");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireAuth();
    const { id } = await params;

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: parseInt(id), userId: payload.userId },
    });

    if (!cartItem) return apiError("Cart item not found", 404);

    await prisma.cartItem.delete({ where: { id: cartItem.id } });
    return apiSuccess(null, "Item removed from cart");
  } catch (err) {
    return handleApiError(err);
  }
}
