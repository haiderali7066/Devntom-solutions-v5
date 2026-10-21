import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// NOTE: on Next.js 16 and later, rename this file to proxy.ts and the function to `proxy`.
// This only redirects early. Real protection is requireAdmin() inside pages, actions and routes.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const secure = req.nextUrl.protocol === "https:";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: secure,
    salt: secure ? "__Secure-authjs.session-token" : "authjs.session-token",
  });
  const isAdmin = token?.role === "admin";
  const onLogin = pathname === "/admin/login";

  if (!isAdmin && !onLogin) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  if (isAdmin && onLogin) return NextResponse.redirect(new URL("/admin", req.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
