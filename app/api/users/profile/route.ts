import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validations/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    const payload = await requireAuth();
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
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const payload = await requireAuth();
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    }

    const updated = await prisma.user.update({
      where: { id: payload.userId },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        updatedAt: true,
      },
    });

    return apiSuccess(updated, "Profile updated successfully");
  } catch (err) {
    return handleApiError(err);
  }
}
