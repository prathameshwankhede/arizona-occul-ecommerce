import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validations/product";
import { generateSlug } from "@/lib/utils/slug";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const search = searchParams.get("search");

    const where = search
      ? { OR: [{ name: { contains: search } }, { sku: { contains: search } }] }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return apiSuccess({ data: products, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);

    const { name, ...rest } = parsed.data;
    const slug = rest.slug || generateSlug(name);

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) return apiError("A product with this slug already exists", 409);

    const product = await prisma.product.create({ data: { name, slug, ...rest } });
    return apiSuccess(product, "Product created", 201);
  } catch (err) {
    return handleApiError(err);
  }
}
