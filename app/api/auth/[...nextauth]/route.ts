import type { NextRequest } from "next/server";
import { handlers } from "@/auth";
import { getIp, limitLogin } from "@/lib/rate-limit";

// bcrypt and mongoose need the Node.js runtime, not the edge runtime.


export const { GET } = handlers;

export async function POST(req: NextRequest) {
  // Slow down password guessing per IP address, on top of the per-account lockout in auth.ts.
  if (req.nextUrl.pathname.endsWith("/callback/credentials")) {
    const r = await limitLogin(getIp(req.headers));
    if (!r.ok) {
      return Response.json(
        { error: "Too many sign-in attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(r.retryAfterSec), "Cache-Control": "no-store" } },
      );
    }
  }
  return handlers.POST(req);
}
