import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { categorySchema } from "@/lib/validations/product";
import { generateSlug } from "@/lib/utils/slug";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    await requireAdmin();
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    });
    return apiSuccess(categories);
  } catch (err) { return handleApiError(err); }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);

    const { name, ...rest } = parsed.data;
    const slug = rest.slug || generateSlug(name);

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) return apiError("A category with this slug already exists", 409);

    const category = await prisma.category.create({ data: { name, slug, ...rest } });
    return apiSuccess(category, "Category created", 201);
  } catch (err) { return handleApiError(err); }
}
