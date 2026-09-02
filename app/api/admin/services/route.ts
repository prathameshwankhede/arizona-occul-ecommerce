import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations/product";
import { generateSlug } from "@/lib/utils/slug";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    await requireAdmin();
    const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    return apiSuccess(services);
  } catch (err) { return handleApiError(err); }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);

    const { name, ...rest } = parsed.data;
    const slug = rest.slug || generateSlug(name);

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) return apiError("A service with this slug already exists", 409);

    const service = await prisma.service.create({ data: { name, slug, ...rest } });
    return apiSuccess(service, "Service created", 201);
  } catch (err) { return handleApiError(err); }
}
