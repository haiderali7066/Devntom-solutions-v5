import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Limits how often something can happen per person.
 * With UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN set, limits are shared
 * across all servers. Without them it falls back to memory, which is fine for local
 * development but resets on every restart and is not shared between serverless instances.
 */
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? Redis.fromEnv() : null;

const limiters = new Map<string, Ratelimit>();
const memory = new Map<string, { count: number; reset: number }>();

export type LimitResult = { ok: boolean; remaining: number; retryAfterSec: number };

/**
 * @param name   what is being limited, e.g. "login" or "upload"
 * @param id     who, e.g. an IP address or user id
 * @param limit  allowed attempts per window
 * @param windowSec window length in seconds
 */
export async function checkLimit(name: string, id: string, limit: number, windowSec: number): Promise<LimitResult> {
  if (redis) {
    const k = `${name}:${limit}:${windowSec}`;
    let rl = limiters.get(k);
    if (!rl) {
      rl = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`), prefix: `rl:${name}`, analytics: false });
      limiters.set(k, rl);
    }
    const r = await rl.limit(id);
    return { ok: r.success, remaining: r.remaining, retryAfterSec: Math.max(0, Math.ceil((r.reset - Date.now()) / 1000)) };
  }

  const now = Date.now();
  const key = `${name}:${id}`;
  const cur = memory.get(key);
  if (!cur || cur.reset <= now) {
    memory.set(key, { count: 1, reset: now + windowSec * 1000 });
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }
  cur.count += 1;
  if (memory.size > 5000) for (const [k, v] of memory) if (v.reset <= now) memory.delete(k);
  return { ok: cur.count <= limit, remaining: Math.max(0, limit - cur.count), retryAfterSec: Math.ceil((cur.reset - now) / 1000) };
}

/** Best-effort client IP from proxy headers. Pass `await headers()` from next/headers. */
export function getIp(h: Headers): string {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/* Ready-made limits */
export const limitLogin = (ip: string) => checkLimit("login", ip, 8, 15 * 60); // 8 tries per 15 minutes per IP
export const limitUpload = (userId: string) => checkLimit("upload", userId, 30, 10 * 60); // 30 uploads per 10 minutes
export const limitWrite = (userId: string) => checkLimit("write", userId, 60, 60); // 60 saves per minute
