"use client";

import { useActionState, useRef, useState } from "react";
import { FaCircleCheck, FaSpinner, FaTriangleExclamation, FaUpload, FaXmark } from "react-icons/fa6";
import { savePost, type FormState } from "@/app/admin/actions";
import { MAX_IMAGE_BYTES, toSlug } from "@/lib/validate";
import RichEditor from "./RichEditor";

export type PostFormData = {
  id: string; title: string; slug: string; excerpt: string; content: string;
  coverUrl: string; coverPublicId: string; coverAlt: string;
  category: string; tags: string; seoTitle: string; seoDescription: string; status: "draft" | "published";
};

const CATEGORIES = ["Website Development", "Mobile Apps", "SEO", "UI/UX Design", "Digital Marketing", "AI Automation", "Software", "General"];

async function uploadFile(file: File): Promise<{ url: string; publicId: string }> {
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image must be under 4 MB.");
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Upload failed.");
  return data;
}

export default function PostForm({ post }: { post?: PostFormData }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost, {});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [seoDesc, setSeoDesc] = useState(post?.seoDescription ?? "");
  const [cover, setCover] = useState({ url: post?.coverUrl ?? "", publicId: post?.coverPublicId ?? "" });
  const [coverBusy, setCoverBusy] = useState(false);
  const [coverErr, setCoverErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const e = state.errors ?? {};
  const live = post?.status === "published";

  const field = "mt-1.5 w-full rounded-[12px] border bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/25";
  const bd = (k: string) => (e[k] ? "border-[#EF4444]" : "border-[#CFE2FF]");
  const Err = ({ k }: { k: string }) => (e[k] ? <p role="alert" className="mt-1 text-xs text-[#B91C1C]">{e[k]}</p> : null);
  const Count = ({ n, max }: { n: number; max: number }) => <span className={`text-xs ${n > max ? "text-[#B91C1C]" : "text-[#64748B]"}`}>{n}/{max}</span>;
  const lab = "block text-sm font-medium text-[#0B1F3B]";

  const pickCover = async (f: File) => {
    setCoverBusy(true); setCoverErr("");
    try { const r = await uploadFile(f); setCover({ url: r.url, publicId: r.publicId }); }
    catch (x) { setCoverErr(x instanceof Error ? x.message : "Upload failed."); }
    finally { setCoverBusy(false); }
  };

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-12">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="coverUrl" value={cover.url} />
      <input type="hidden" name="coverPublicId" value={cover.publicId} />

      {state.message && (
        <p role="status" className={`flex items-center gap-2 rounded-[12px] p-4 text-sm lg:col-span-12 ${state.ok ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEF2F2] text-[#B91C1C]"}`}>
          {state.ok ? <FaCircleCheck aria-hidden="true" /> : <FaTriangleExclamation aria-hidden="true" />}{state.message}
        </p>
      )}

      <div className="space-y-5 lg:col-span-8">
        <div className="rounded-[18px] border border-[#CFE2FF] bg-white p-6">
          <label className={lab}><span className="flex justify-between">Title <Count n={title.length} max={160} /></span>
            <input name="title" value={title} onChange={(x) => { setTitle(x.target.value); if (!slugTouched) setSlug(toSlug(x.target.value)); }} required className={`${field} ${bd("title")} text-lg font-semibold`} placeholder="How much does a website cost in Pakistan?" /></label><Err k="title" />
          <label className={`${lab} mt-5`}>URL slug
            <div className={`mt-1.5 flex items-center overflow-hidden rounded-[12px] border bg-white focus-within:border-[#007BFF] ${bd("slug")}`}><span className="shrink-0 bg-[#F5F9FF] px-3 py-3 text-sm text-[#64748B]">/blog/</span><input name="slug" value={slug} onChange={(x) => { setSlugTouched(true); setSlug(toSlug(x.target.value)); }} required className="w-full px-3 py-3 text-[15px] outline-none" /></div></label><Err k="slug" />
          <label className={`${lab} mt-5`}><span className="flex justify-between">Short summary <Count n={excerpt.length} max={320} /></span>
            <textarea name="excerpt" value={excerpt} onChange={(x) => setExcerpt(x.target.value)} rows={3} required className={`${field} ${bd("excerpt")}`} placeholder="One or two sentences shown on the blog list." /></label><Err k="excerpt" />
        </div>

        <div>
          <p className={`${lab} mb-2`}>Content</p>
          <RichEditor value={content} onChange={setContent} onUpload={uploadFile} invalid={!!e.content} /><Err k="content" />
        </div>
      </div>

      <aside className="space-y-5 lg:col-span-4">
        <div className="space-y-3 rounded-[18px] border border-[#CFE2FF] bg-white p-6 lg:sticky lg:top-24">
          <p className="text-sm font-medium">Status: <span className={live ? "text-[#166534]" : "text-[#92400E]"}>{live ? "Published" : "Draft"}</span></p>
          <button name="status" value="draft" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0B1F3B] px-5 py-3 text-sm font-medium transition hover:bg-[#0B1F3B] hover:text-white disabled:opacity-60">{pending && <FaSpinner className="animate-spin" aria-hidden="true" />}{live ? "Revert to draft" : "Save draft"}</button>
          <button name="status" value="published" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#007BFF] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0052CC] disabled:opacity-60">{pending && <FaSpinner className="animate-spin" aria-hidden="true" />}{live ? "Update published post" : "Publish"}</button>

          <hr className="border-[#E2ECFA]" />
          <p className={lab}>Cover image</p>
          {cover.url ? (
            <div className="relative overflow-hidden rounded-[12px] border border-[#CFE2FF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover.url} alt="" className="aspect-[16/9] w-full object-cover" />
              <button type="button" onClick={() => setCover({ url: "", publicId: "" })} aria-label="Remove cover image" className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3B]/80 text-white hover:bg-[#EF4444]"><FaXmark size={13} /></button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#93C5FD] text-sm text-[#0052CC] transition hover:bg-[#EAF2FF]">{coverBusy ? <FaSpinner className="animate-spin" /> : <FaUpload />}{coverBusy ? "Uploading..." : "Upload image (max 4 MB)"}</button>
          )}
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={(x) => { const f = x.target.files?.[0]; x.target.value = ""; if (f) void pickCover(f); }} />
          {coverErr && <p role="alert" className="text-xs text-[#B91C1C]">{coverErr}</p>}
          <label className={lab}>Image description (alt text)<input name="coverAlt" defaultValue={post?.coverAlt ?? ""} maxLength={160} className={`${field} ${bd("coverImage.alt")}`} /></label><Err k="coverImage.url" />

          <hr className="border-[#E2ECFA]" />
          <label className={lab}>Category<input name="category" list="cats" defaultValue={post?.category ?? "General"} className={`${field} ${bd("category")}`} /><datalist id="cats">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist></label>
          <label className={lab}>Tags (comma separated)<input name="tags" defaultValue={post?.tags ?? ""} className={`${field} ${bd("tags")}`} placeholder="seo, pricing, pakistan" /></label>
        </div>

        <div className="space-y-3 rounded-[18px] border border-[#CFE2FF] bg-white p-6">
          <p className="text-sm font-semibold">Search appearance</p>
          <label className={lab}><span className="flex justify-between">SEO title <Count n={seoTitle.length} max={70} /></span><input name="seoTitle" value={seoTitle} onChange={(x) => setSeoTitle(x.target.value)} className={`${field} ${bd("seoTitle")}`} placeholder={title || "Defaults to the post title"} /></label><Err k="seoTitle" />
          <label className={lab}><span className="flex justify-between">SEO description <Count n={seoDesc.length} max={170} /></span><textarea name="seoDescription" value={seoDesc} onChange={(x) => setSeoDesc(x.target.value)} rows={3} className={`${field} ${bd("seoDescription")}`} placeholder={excerpt || "Defaults to the summary"} /></label><Err k="seoDescription" />
          <div className="rounded-[12px] bg-[#F5F9FF] p-4">
            <p className="truncate text-xs text-[#166534]">devntomsolutions.com › blog › {slug || "your-post"}</p>
            <p className="mt-0.5 truncate text-base text-[#1A0DAB]">{(seoTitle || title || "Post title") + " | Devntom Solutions"}</p>
            <p className="line-clamp-2 text-xs text-[#475569]">{seoDesc || excerpt || "Your description appears here."}</p>
          </div>
        </div>
      </aside>
    </form>
  );
}
