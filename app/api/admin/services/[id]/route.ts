import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations/product";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = serviceSchema.partial().safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    const service = await prisma.service.update({ where: { id: parseInt(id) }, data: parsed.data });
    return apiSuccess(service, "Service updated");
  } catch (err) { return handleApiError(err); }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.service.delete({ where: { id: parseInt(id) } });
    return apiSuccess(null, "Service deleted");
  } catch (err) { return handleApiError(err); }
}
