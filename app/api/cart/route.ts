import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const payload = await requireAuth();

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: {
        product: {
          include: { category: { select: { name: true, slug: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(
        item.product.salePrice?.toString() ?? item.product.price.toString()
      );
      return sum + price * item.quantity;
    }, 0);

    return apiSuccess({ items: cartItems, subtotal: subtotal.toFixed(2) });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE() {
  try {
    const payload = await requireAuth();
    await prisma.cartItem.deleteMany({ where: { userId: payload.userId } });
    return apiSuccess(null, "Cart cleared");
  } catch (err) {
    return handleApiError(err);
  }
}
