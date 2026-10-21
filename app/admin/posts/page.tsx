import { requireAdmin } from "@/auth";
import PostForm from "@/components/admin/PostForm";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">New post</h1>
      <PostForm />
    </>
  );
}
