import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import type { JWTPayload, Role } from "@/types";

const AUTH_COOKIE = "arizona_occul_token";
const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "fallback-dev-secret-replace-in-production-32chars"
);

// ─── Token Generation ───────────────────

export async function signToken(payload: Omit<JWTPayload, "iat" | "exp">) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

// ─── Token Verification ─────────────────

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Helpers ─────────────────────

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value ?? null;
}

// ─── Current User from Request ──────────

export async function getCurrentUser(
  req?: NextRequest
): Promise<JWTPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(AUTH_COOKIE)?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get(AUTH_COOKIE)?.value;
  }

  if (!token) return null;
  return verifyToken(token);
}

// ─── Role Guards ────────────────────────

export async function requireAuth(req?: NextRequest): Promise<JWTPayload> {
  const user = await getCurrentUser(req);
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin(req?: NextRequest): Promise<JWTPayload> {
  const user = await requireAuth(req);
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}

export function isAdmin(role: Role): boolean {
  return role === "ADMIN";
}
