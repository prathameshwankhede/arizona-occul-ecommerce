import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

const addItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99).default(1),
});

export async function POST(req: NextRequest) {
  try {
    const payload = await requireAuth();
    const body = await req.json();
    const parsed = addItemSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    }

    const { productId, quantity } = parsed.data;

    // Check product availability
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.status === "INACTIVE") {
      return apiError("Product not found", 404);
    }
    if (product.stock < quantity) {
      return apiError(`Only ${product.stock} items available in stock`, 409);
    }

    // Upsert cart item
    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: payload.userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId: payload.userId, productId, quantity },
      include: { product: true },
    });

    return apiSuccess(cartItem, "Item added to cart", 201);
  } catch (err) {
    return handleApiError(err);
  }
}
