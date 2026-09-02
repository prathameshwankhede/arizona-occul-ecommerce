import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { consultationSchema } from "@/lib/validations/consultation";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function POST(req: NextRequest) {
  try {
    const payload = await getCurrentUser();
    const body = await req.json();
    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    }

    const { serviceId, name, phone, email, preferredDate, preferredTime, message } =
      parsed.data;

    const consultation = await prisma.consultation.create({
      data: {
        userId: payload?.userId ?? null,
        serviceId: serviceId ?? null,
        name,
        phone,
        email: email || null,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || null,
        message: message || null,
        status: "NEW",
      },
    });

    return apiSuccess(consultation, "Consultation request submitted successfully", 201);
  } catch (err) {
    console.error("[Consultation POST]", err);
    return apiError("Internal server error", 500);
  }
}
