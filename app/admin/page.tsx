import Link from "next/link";
import { FaEye, FaEyeSlash, FaPenToSquare, FaPlus, FaTrash } from "react-icons/fa6";
import { requireAdmin } from "@/auth";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { deletePost, togglePublish } from "./actions";

export const metadata = { title: "Posts" };

const fmt = (d?: Date | null) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "-");

export default async function AdminHome() {
  await requireAdmin();
  await connectDB();
  const posts = await Post.find().sort({ updatedAt: -1 }).select("title slug status category publishedAt updatedAt").lean();
  const published = posts.filter((p) => p.status === "published").length;
  const btn = "inline-flex h-9 items-center gap-1.5 rounded-full border border-[#CFE2FF] px-3.5 text-xs font-medium text-[#0B1F3B] transition hover:border-[#007BFF] hover:bg-[#EAF2FF]";

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-3xl font-semibold tracking-tight">Posts</h1><p className="mt-1 text-sm text-[#64748B]">Write, publish and manage your blog.</p></div>
        <Link href="/admin/posts/new" className="inline-flex items-center gap-2 rounded-full bg-[#007BFF] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0052CC]"><FaPlus size={12} aria-hidden="true" />New post</Link>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-3">
        {[["Total", posts.length], ["Published", published], ["Drafts", posts.length - published]].map(([l, v]) => <div key={String(l)} className="rounded-[16px] border border-[#CFE2FF] bg-white p-5"><dd className="text-3xl font-semibold">{v}</dd><dt className="text-sm text-[#64748B]">{l}</dt></div>)}
      </dl>

      <div className="mt-8 overflow-hidden rounded-[18px] border border-[#CFE2FF] bg-white">
        {posts.length === 0 ? (
          <p className="p-10 text-center text-[#64748B]">No posts yet. Create your first one.</p>
        ) : (
          <ul className="divide-y divide-[#E2ECFA]">
            {posts.map((p) => {
              const id = String(p._id);
              const live = p.status === "published";
              return (
                <li key={id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/posts/${id}`} className="block truncate font-semibold hover:text-[#007BFF]">{p.title}</Link>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B]">
                      <span className={`rounded-full px-2.5 py-0.5 font-medium ${live ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEF3C7] text-[#92400E]"}`}>{live ? "Published" : "Draft"}</span>
                      <span>{p.category}</span><span>/blog/{p.slug}</span><span>Updated {fmt(p.updatedAt)}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/posts/${id}`} className={btn}><FaPenToSquare size={11} aria-hidden="true" />Edit</Link>
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={id} /><input type="hidden" name="to" value={live ? "draft" : "published"} />
                      <button className={btn}>{live ? <FaEyeSlash size={12} aria-hidden="true" /> : <FaEye size={12} aria-hidden="true" />}{live ? "Unpublish" : "Publish"}</button>
                    </form>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={id} />
                      <ConfirmButton message={`Delete "${p.title}"? This cannot be undone.`} className={`${btn} text-[#B91C1C] hover:border-[#EF4444] hover:bg-[#FEF2F2]`}><FaTrash size={11} aria-hidden="true" />Delete</ConfirmButton>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
