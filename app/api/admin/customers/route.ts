import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, handleApiError } from "@/lib/utils/api";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const search = searchParams.get("search");

    const where = search
      ? { OR: [{ name: { contains: search } }, { email: { contains: search } }], role: "CUSTOMER" as const }
      : { role: "CUSTOMER" as const };

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: { id: true, name: true, email: true, phone: true, status: true, createdAt: true, _count: { select: { orders: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return apiSuccess({ data: customers, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) { return handleApiError(err); }
}
