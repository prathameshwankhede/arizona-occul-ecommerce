import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues?.[0]?.message ?? "Validation error", 422);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return apiError("Invalid email or password", 401);
    }

    if (user.status === "BANNED") {
      return apiError("Your account has been suspended. Please contact support.", 403);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return apiError("Invalid email or password", 401);
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const { passwordHash: _, ...safeUser } = user;
    const response = apiSuccess({ user: safeUser }, "Login successful");
    await setAuthCookie(token);
    return response;
  } catch (err) {
    console.error("[Login Error]", err);
    return apiError("Internal server error", 500);
  }
}
