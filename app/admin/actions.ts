"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { requireAdmin, signIn, signOut } from "@/auth";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { deleteImage } from "@/lib/cloudinary";
import { getIp, limitLogin, limitWrite } from "@/lib/rate-limit";
import { sanitizeHtml, stripHtml } from "@/lib/sanitize";
import { fieldErrors, loginSchema, objectId, postSchema, toSlug } from "@/lib/validate";

export type LoginState = { error?: string };
export type FormState = { ok?: boolean; message?: string; errors?: Record<string, string> };

/* ---------------- auth ---------------- */

export async function loginAction(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const rl = await limitLogin(getIp(await headers()));
  if (!rl.ok) return { error: `Too many attempts. Try again in ${Math.max(1, Math.ceil(rl.retryAfterSec / 60))} minutes.` };

  const parsed = loginSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
  if (!parsed.success) return { error: "Enter a valid email and password." };

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: "/admin" });
  } catch (e) {
    if (e instanceof AuthError) return { error: "Invalid email or password." };
    throw e; // the redirect after a successful login is thrown on purpose
  }
  return {};
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

/* ---------------- posts ---------------- */

function refresh(...slugs: (string | undefined)[]) {
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  for (const s of slugs) if (s) revalidatePath(`/blog/${s}`);
}

export async function savePost(_prev: FormState, fd: FormData): Promise<FormState> {
  const user = await requireAdmin();
  const rl = await limitWrite(user.id);
  if (!rl.ok) return { message: "Too many saves. Please wait a moment." };

  const g = (k: string) => String(fd.get(k) ?? "");
  const id = g("id");
  if (id && !objectId.safeParse(id).success) return { message: "Invalid post." };

  // Clean everything before validating or saving.
  const parsed = postSchema.safeParse({
    title: stripHtml(g("title")),
    slug: toSlug(g("slug") || g("title")),
    excerpt: stripHtml(g("excerpt")),
    content: sanitizeHtml(g("content")),
    coverImage: { url: g("coverUrl"), publicId: g("coverPublicId"), alt: stripHtml(g("coverAlt")) },
    category: stripHtml(g("category")) || "General",
    tags: g("tags").split(",").map((t) => stripHtml(t)).filter(Boolean),
    seoTitle: stripHtml(g("seoTitle")),
    seoDescription: stripHtml(g("seoDescription")),
    status: g("status") === "published" ? "published" : "draft",
  });
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: "Please fix the highlighted fields." };
  const data = parsed.data;

  await connectDB();
  const clash = await Post.findOne({ slug: data.slug, ...(id ? { _id: { $ne: id } } : {}) }).select("_id").lean();
  if (clash) return { errors: { slug: "This URL is already used by another post" }, message: "Please fix the highlighted fields." };

  if (id) {
    const doc = await Post.findById(id);
    if (!doc) return { message: "Post not found." };
    const oldSlug = doc.slug;
    const oldCover = doc.coverImage?.publicId;
    doc.set(data);
    await doc.save(); // runs the reading-time and published-date logic
    if (oldCover && oldCover !== data.coverImage.publicId) await deleteImage(oldCover).catch(() => {});
    refresh(oldSlug, data.slug);
    return { ok: true, message: data.status === "published" ? "Saved and published." : "Saved as draft." };
  }

  const doc = await Post.create(data);
  refresh(data.slug);
  redirect(`/admin/posts/${doc.id}`);
}

export async function togglePublish(fd: FormData) {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  const to = fd.get("to") === "published" ? "published" : "draft";
  if (!objectId.safeParse(id).success) return;
  await connectDB();
  const doc = await Post.findById(id);
  if (!doc) return;
  doc.status = to;
  await doc.save();
  refresh(doc.slug);
}

export async function deletePost(fd: FormData) {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  if (!objectId.safeParse(id).success) return;
  await connectDB();
  const doc = await Post.findById(id);
  if (!doc) return;
  const cover = doc.coverImage?.publicId;
  const slug = doc.slug;
  await doc.deleteOne();
  if (cover) await deleteImage(cover).catch(() => {});
  refresh(slug);
}
