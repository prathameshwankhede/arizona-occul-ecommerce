import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

const updateSchema = z.object({
  status: z.enum(["NEW","CONTACTED","CONFIRMED","COMPLETED","CANCELLED"]),
});

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);

    const consultation = await prisma.consultation.update({
      where: { id: parseInt(id) },
      data: { status: parsed.data.status },
    });
    return apiSuccess(consultation, "Consultation updated");
  } catch (err) { return handleApiError(err); }
}
