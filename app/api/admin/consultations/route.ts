import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError, handleApiError } from "@/lib/utils/api";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const status = searchParams.get("status");

    const where = status ? { status: status as never } : {};

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true } },
          service: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.consultation.count({ where }),
    ]);

    return apiSuccess({ data: consultations, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) { return handleApiError(err); }
}
