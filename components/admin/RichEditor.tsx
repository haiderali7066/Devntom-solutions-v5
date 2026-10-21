"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { FaBold, FaCode, FaHeading, FaImage, FaItalic, FaLink, FaListOl, FaListUl, FaQuoteLeft, FaRotateLeft, FaRotateRight, FaSpinner } from "react-icons/fa6";

type Props = {
  value: string;
  onChange: (html: string) => void;
  /** Uploads an image through /api/upload and returns its URL. */
  onUpload: (file: File) => Promise<{ url: string }>;
  invalid?: boolean;
};

const CSS = `
.ed h2{font-size:1.6rem;font-weight:700;margin:1.6rem 0 .6rem;letter-spacing:-.02em}
.ed h3{font-size:1.25rem;font-weight:600;margin:1.3rem 0 .5rem}
.ed h4{font-size:1.05rem;font-weight:600;margin:1.1rem 0 .4rem}
.ed p{margin:.8rem 0;line-height:1.75}
.ed ul{list-style:disc;padding-left:1.5rem;margin:.8rem 0}.ed ol{list-style:decimal;padding-left:1.5rem;margin:.8rem 0}
.ed blockquote{border-left:4px solid #007BFF;padding:.2rem 0 .2rem 1rem;margin:1rem 0;color:#475569}
.ed a{color:#0052CC;text-decoration:underline}.ed code{background:#EAF2FF;padding:.1rem .35rem;border-radius:4px;font-size:.9em}
.ed pre{background:#0B1F3B;color:#E6F0FF;padding:1rem;border-radius:10px;overflow:auto}
.ed img{max-width:100%;height:auto;border-radius:12px;margin:1rem 0}
.ed p.is-editor-empty:first-child::before{content:attr(data-placeholder);color:#94A3B8;float:left;height:0;pointer-events:none}
`;

export default function RichEditor({ value, onChange, onUpload, invalid }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const editor = useEditor({
    immediatelyRender: false, // avoids a hydration mismatch in Next.js
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https", HTMLAttributes: { rel: "noopener noreferrer" } },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
    ],
    content: value,
    editorProps: { attributes: { class: "ed min-h-[22rem] px-5 py-4 outline-none", "aria-label": "Post content" } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return <div className="min-h-[26rem] animate-pulse rounded-[14px] border border-[#CFE2FF] bg-white" />;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address (https://...)", prev ?? "https://");
    if (url === null) return;
    if (url.trim() === "") return void editor.chain().focus().extendMarkRange("link").unsetLink().run();
    if (!/^(https?:\/\/|mailto:)/i.test(url.trim())) return void setErr("Links must start with https://, http:// or mailto:");
    setErr("");
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const addImage = async (file: File) => {
    setBusy(true); setErr("");
    try {
      const { url } = await onUpload(file);
      const alt = window.prompt("Describe the image for accessibility and SEO (alt text)", "") ?? "";
      editor.chain().focus().setImage({ src: url, alt }).run();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const Tb = ({ on, label, active, children }: { on: () => void; label: string; active?: boolean; children: React.ReactNode }) => (
    <button type="button" onClick={on} aria-label={label} title={label} aria-pressed={active} className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-sm transition ${active ? "bg-[#007BFF] text-white" : "text-[#0B1F3B] hover:bg-[#EAF2FF]"}`}>{children}</button>
  );
  const H = ({ n }: { n: 2 | 3 | 4 }) => (
    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: n }).run()} aria-label={`Heading ${n}`} title={`Heading ${n}`} aria-pressed={editor.isActive("heading", { level: n })} className={`flex h-9 items-center gap-1 rounded-[8px] px-2.5 text-xs font-semibold transition ${editor.isActive("heading", { level: n }) ? "bg-[#007BFF] text-white" : "text-[#0B1F3B] hover:bg-[#EAF2FF]"}`}><FaHeading size={11} aria-hidden="true" />{n}</button>
  );

  return (
    <div className={`overflow-hidden rounded-[14px] border bg-white ${invalid ? "border-[#EF4444]" : "border-[#CFE2FF] focus-within:border-[#007BFF]"}`}>
      <style>{CSS}</style>
      <div className="flex flex-wrap items-center gap-1 border-b border-[#E2ECFA] bg-[#F8FBFF] p-2">
        <H n={2} /><H n={3} /><H n={4} />
        <span className="mx-1 h-6 w-px bg-[#CFE2FF]" />
        <Tb on={() => editor.chain().focus().toggleBold().run()} label="Bold" active={editor.isActive("bold")}><FaBold size={13} /></Tb>
        <Tb on={() => editor.chain().focus().toggleItalic().run()} label="Italic" active={editor.isActive("italic")}><FaItalic size={13} /></Tb>
        <Tb on={() => editor.chain().focus().toggleCode().run()} label="Inline code" active={editor.isActive("code")}><FaCode size={13} /></Tb>
        <span className="mx-1 h-6 w-px bg-[#CFE2FF]" />
        <Tb on={() => editor.chain().focus().toggleBulletList().run()} label="Bullet list" active={editor.isActive("bulletList")}><FaListUl size={13} /></Tb>
        <Tb on={() => editor.chain().focus().toggleOrderedList().run()} label="Numbered list" active={editor.isActive("orderedList")}><FaListOl size={13} /></Tb>
        <Tb on={() => editor.chain().focus().toggleBlockquote().run()} label="Quote" active={editor.isActive("blockquote")}><FaQuoteLeft size={13} /></Tb>
        <span className="mx-1 h-6 w-px bg-[#CFE2FF]" />
        <Tb on={setLink} label="Link" active={editor.isActive("link")}><FaLink size={13} /></Tb>
        <Tb on={() => fileRef.current?.click()} label="Insert image">{busy ? <FaSpinner size={13} className="animate-spin" /> : <FaImage size={13} />}</Tb>
        <span className="mx-1 h-6 w-px bg-[#CFE2FF]" />
        <Tb on={() => editor.chain().focus().undo().run()} label="Undo"><FaRotateLeft size={12} /></Tb>
        <Tb on={() => editor.chain().focus().redo().run()} label="Redo"><FaRotateRight size={12} /></Tb>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) void addImage(f); }} />
      </div>
      <EditorContent editor={editor} />
      {err && <p role="alert" className="border-t border-[#FECACA] bg-[#FEF2F2] px-4 py-2 text-sm text-[#B91C1C]">{err}</p>}
    </div>
  );
}
