import type { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { limitUpload } from "@/lib/rate-limit";
import { MAX_IMAGE_BYTES, sniffImage } from "@/lib/validate";



const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });

/** Admin session check that returns JSON instead of redirecting. */
async function admin() {
  const session = await auth();
  return session?.user?.role === "admin" ? session.user : null;
}

/** Rejects requests that did not come from this site (extra protection against cross-site posts). */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  return !origin || origin === req.nextUrl.origin;
}

/** POST /api/upload  (multipart form, field name "file") returns { url, publicId, width, height } */
export async function POST(req: NextRequest) {
  const user = await admin();
  if (!user) return json({ error: "Unauthorized" }, 401);
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);

  const rl = await limitUpload(user.id);
  if (!rl.ok) return json({ error: "Too many uploads. Please wait a moment." }, 429, { "Retry-After": String(rl.retryAfterSec) });

  // Refuse oversized bodies before reading them.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_IMAGE_BYTES + 100_000) return json({ error: "Image is too large (4 MB maximum)." }, 413);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "Invalid upload." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "No file received." }, 400);
  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) return json({ error: "Image must be under 4 MB." }, 413);

  const buffer = Buffer.from(await file.arrayBuffer());
  // Trust the file's real signature, not the name or the type the browser reports.
  if (!sniffImage(buffer)) return json({ error: "Only JPEG, PNG, WebP or GIF images are allowed." }, 415);

  try {
    const img = await uploadImage(buffer);
    return json(img);
  } catch (e) {
    console.error("Cloudinary upload failed", e);
    return json({ error: "Upload failed. Please try again." }, 502);
  }
}

const deleteSchema = z.object({ publicId: z.string().max(200).regex(/^[\w\-./]+$/) });

/** DELETE /api/upload  body: { publicId } removes an image from the blog folder only. */
export async function DELETE(req: NextRequest) {
  const user = await admin();
  if (!user) return json({ error: "Unauthorized" }, 401);
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);

  const parsed = deleteSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Invalid request." }, 400);

  try {
    const ok = await deleteImage(parsed.data.publicId);
    return ok ? json({ ok: true }) : json({ error: "Image not found." }, 404);
  } catch (e) {
    console.error("Cloudinary delete failed", e);
    return json({ error: "Delete failed." }, 502);
  }
}
