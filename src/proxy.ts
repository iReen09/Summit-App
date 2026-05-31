import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const proxy = auth((request) => {
  const session = request.auth;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/akun") && !session?.user) {
    const loginUrl = new URL("/masuk", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && !session?.user?.isAdmin) {
    const loginUrl = new URL("/masuk", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/akun/:path*", "/admin/:path*"],
};
