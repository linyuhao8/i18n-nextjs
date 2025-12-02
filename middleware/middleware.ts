import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh"];
const defaultLocale = "zh";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 如果路徑已經包含語系 → 直接通過
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // 否則 → 加上預設語系 zh
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
