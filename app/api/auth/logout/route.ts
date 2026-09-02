import { clearAuthCookie } from "@/lib/auth";
import { apiSuccess } from "@/lib/utils/api";

export async function POST() {
  await clearAuthCookie();
  return apiSuccess(null, "Logged out successfully");
}
