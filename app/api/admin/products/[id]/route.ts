import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validations/product";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: { select: { id: true, name: true } } },
    });
    if (!product) return apiError("Product not found", 404);
    return apiSuccess(product);
  } catch (err) { return handleApiError(err); }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = productSchema.partial().safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });
    return apiSuccess(product, "Product updated");
  } catch (err) { return handleApiError(err); }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    return apiSuccess(null, "Product deleted");
  } catch (err) { return handleApiError(err); }
}
