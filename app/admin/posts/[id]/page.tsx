import { notFound } from "next/navigation";
import { requireAdmin } from "@/auth";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { objectId } from "@/lib/validate";
import PostForm from "@/components/admin/PostForm";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!objectId.safeParse(id).success) notFound();

  await connectDB();
  const p = await Post.findById(id).lean();
  if (!p) notFound();

  // Pass only plain, serialisable values to the client form.
  const post = {
    id: String(p._id), title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content,
    coverUrl: p.coverImage?.url ?? "", coverPublicId: p.coverImage?.publicId ?? "", coverAlt: p.coverImage?.alt ?? "",
    category: p.category, tags: (p.tags ?? []).join(", "), seoTitle: p.seoTitle ?? "", seoDescription: p.seoDescription ?? "", status: p.status as "draft" | "published",
  };
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Edit post</h1>
      <PostForm post={post} />
    </>
  );
}
