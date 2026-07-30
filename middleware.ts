import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];

const protectedRoutes = [
  "/customer-dashboard",
  "/technician-dashboard",
  "/admin-dashboard",
];

const roleBasedRoutes: Record<string, string> = {
  CUSTOMER: "/customer-dashboard",
  TECHNICIAN: "/technician-dashboard",
  ADMIN: "/admin-dashboard",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // ১. লগইন ছাড়া প্রটেক্টেড ড্যাশবোর্ডে প্রবেশের চেষ্টা করলে -> /login এ পাঠাবে
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ২. লগইন অবস্থায় /login বা /register পেজে ঢোকার চেষ্টা করলে -> নিজ ড্যাশবোর্ডে পাঠাবে
  if (token && isAuthRoute) {
    const redirectUrl =
      role && roleBasedRoutes[role] ? roleBasedRoutes[role] : "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // ৩. রোল ভিত্তিক ড্যাশবোর্ড গার্ড (Wrong Role Protection)
  if (token && role && isProtectedRoute) {
    const expectedDashboard = roleBasedRoutes[role];

    if (expectedDashboard && !pathname.startsWith(expectedDashboard)) {
      return NextResponse.redirect(new URL(expectedDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/customer-dashboard/:path*",
    "/technician-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
