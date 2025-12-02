import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // 已有 locale → OK
  if (pathname.startsWith("/en") || pathname.startsWith("/zh")) {
    return NextResponse.next();
  }

  // 其他 → redirect /zh
  return NextResponse.redirect(new URL("/zh" + pathname, request.url));
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
