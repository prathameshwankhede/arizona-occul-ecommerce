import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const payload = await getCurrentUser();
    if (!payload) return apiError("Unauthorized", 401);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) return apiError("User not found", 404);
    return apiSuccess(user);
  } catch (err) {
    console.error("[Me Error]", err);
    return apiError("Internal server error", 500);
  }
}
