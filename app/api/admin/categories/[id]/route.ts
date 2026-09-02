import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { categorySchema } from "@/lib/validations/product";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = categorySchema.partial().safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    const category = await prisma.category.update({ where: { id: parseInt(id) }, data: parsed.data });
    return apiSuccess(category, "Category updated");
  } catch (err) { return handleApiError(err); }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.category.delete({ where: { id: parseInt(id) } });
    return apiSuccess(null, "Category deleted");
  } catch (err) { return handleApiError(err); }
}
