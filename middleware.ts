import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextUrl.pathname !== "/admin/login"
  ) {
    const isAuth = request.cookies.get("admin_auth")?.value === "true";
    if (!isAuth) {
      // Adiciona query string para mostrar toast na tela de login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "restricted");
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
