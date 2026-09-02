import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations/order";
import { generateOrderNumber } from "@/lib/utils/order";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

// POST /api/orders — Place a new order
export async function POST(req: NextRequest) {
  try {
    const payload = await requireAuth();
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    }

    // Fetch cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return apiError("Your cart is empty", 400);
    }

    // Validate stock for all items
    for (const item of cartItems) {
      if (item.product.status === "INACTIVE") {
        return apiError(`"${item.product.name}" is no longer available`, 409);
      }
      if (item.product.stock < item.quantity) {
        return apiError(
          `Insufficient stock for "${item.product.name}". Only ${item.product.stock} available.`,
          409
        );
      }
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(
        item.product.salePrice?.toString() ?? item.product.price.toString()
      );
      return sum + price * item.quantity;
    }, 0);

    const shipping = subtotal >= 999 ? 0 : 99; // Free shipping above ₹999
    const total = subtotal + shipping;

    // Create order in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const orderNumber = generateOrderNumber();

      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: payload.userId,
          subtotal,
          shipping,
          discount: 0,
          total,
          paymentStatus: "COD",
          orderStatus: "PENDING",
          name: parsed.data.name,
          phone: parsed.data.phone,
          address: parsed.data.address,
          city: parsed.data.city,
          state: parsed.data.state,
          pincode: parsed.data.pincode,
          notes: parsed.data.notes,
          orderItems: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              productName: item.product.name,
              quantity: item.quantity,
              price:
                item.product.salePrice ?? item.product.price,
              total:
                parseFloat(
                  (item.product.salePrice ?? item.product.price).toString()
                ) * item.quantity,
            })),
          },
        },
        include: { orderItems: true },
      });

      // Reduce stock
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { userId: payload.userId } });

      return newOrder;
    });

    return apiSuccess(order, "Order placed successfully", 201);
  } catch (err) {
    return handleApiError(err);
  }
}
