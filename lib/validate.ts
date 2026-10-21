import { z } from "zod";

/* ---------- helpers ---------- */

/** "How Much Does a Website Cost?" becomes "how-much-does-a-website-cost" */
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

const textLength = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().length;

/* ---------- image upload rules (used by /api/upload) ---------- */

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

/** Checks the real file signature, because the browser-reported type can be faked. */
export function sniffImage(buf: Uint8Array): AllowedImageType | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return "image/gif";
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return "image/webp";
  return null;
}

/* ---------- schemas ---------- */

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),
  password: z.string().min(8, "Password is too short").max(200),
});

const cloudinaryUrl = z
  .string()
  .max(500)
  .refine((u) => u === "" || /^https:\/\/res\.cloudinary\.com\//.test(u), "Cover image must come from Cloudinary");

export const postSchema = z.object({
  title: z.string().trim().min(5, "Title is too short").max(160),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only").min(3).max(120),
  excerpt: z.string().trim().min(20, "Write a short summary of at least 20 characters").max(320),
  content: z.string().max(200_000).refine((c) => textLength(c) >= 50, "The post body is too short"),
  coverImage: z
    .object({
      url: cloudinaryUrl.default(""),
      publicId: z.string().max(200).regex(/^[\w\-./]*$/, "Invalid image id").default(""),
      alt: z.string().trim().max(160).default(""),
    })
    .default({ url: "", publicId: "", alt: "" }),
  category: z.string().trim().min(2).max(60).default("General"),
  tags: z
    .array(z.string().trim().toLowerCase().min(1).max(30))
    .max(10)
    .default([])
    .transform((t) => [...new Set(t)]),
  seoTitle: z.string().trim().max(70, "Keep the SEO title under 70 characters").default(""),
  seoDescription: z.string().trim().max(170, "Keep the SEO description under 170 characters").default(""),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type PostInput = z.infer<typeof postSchema>;

/** Mongo ids are 24 hex characters. Reject anything else before it reaches a query. */
export const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");

/** Turns a zod error into { field: "message" } for showing under form inputs. */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
