import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    await requireAdmin();

    const [
      totalCustomers,
      totalProducts,
      totalOrders,
      pendingOrders,
      consultationRequests,
      revenueResult,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.product.count({ where: { status: "ACTIVE" } }),
      prisma.order.count(),
      prisma.order.count({ where: { orderStatus: "PENDING" } }),
      prisma.consultation.count({ where: { status: "NEW" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { orderStatus: { not: "CANCELLED" } },
      }),
    ]);

    return apiSuccess({
      totalCustomers,
      totalProducts,
      totalOrders,
      pendingOrders,
      consultationRequests,
      totalRevenue: (revenueResult._sum.total ?? 0).toString(),
    });
  } catch (err) {
    return handleApiError(err);
  }
}
