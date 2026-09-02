import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const AUTH_COOKIE = "arizona_occul_token";

// Routes that require authentication
const PROTECTED_PATHS = ["/account", "/cart", "/checkout"];

// Routes that require ADMIN role
const ADMIN_PATHS = ["/admin"];

// Routes that are only for guests (redirect if already logged in)
const GUEST_ONLY_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  // ─── Admin API protection ─────────────
  if (pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
  }

  // ─── Protected API routes ─────────────
  if (
    pathname.startsWith("/api/cart") ||
    pathname.startsWith("/api/orders") ||
    pathname.startsWith("/api/consultations/my") ||
    pathname.startsWith("/api/users/profile")
  ) {
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // ─── Admin page protection ────────────
  const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  if (isAdminPath && pathname !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    const payload = await verifyToken(token);
    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // ─── Account page protection ──────────
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (isProtected) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    const payload = await verifyToken(token);
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ─── Guest-only pages ─────────────────
  const isGuestOnly = GUEST_ONLY_PATHS.some((p) => pathname === p);
  if (isGuestOnly && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/account", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/api/admin/:path*",
    "/api/cart/:path*",
    "/api/orders/:path*",
    "/api/consultations/my/:path*",
    "/api/users/:path*",
  ],
};
