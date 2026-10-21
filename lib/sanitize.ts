import sanitize from "sanitize-html";

/**
 * Cleans HTML coming from the editor BEFORE it is saved, so a stolen session
 * or a pasted payload can never store a script on your public blog.
 * Only a small set of safe tags and attributes survive.
 */
const OPTIONS: sanitize.IOptions = {
  allowedTags: ["h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "code", "pre", "blockquote", "ul", "ol", "li", "a", "img", "figure", "figcaption"],
  allowedAttributes: {
    a: ["href", "target", "rel", "title"],
    img: ["src", "alt", "width", "height", "loading"],
  },
  allowedSchemes: ["https", "http", "mailto"],
  allowedSchemesByTag: { img: ["https"] },
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  transformTags: {
    h1: "h2", // the post title is the only h1 on the page
    a: (tag, attribs) => {
      const href = attribs.href ?? "";
      const external = /^https?:\/\//i.test(href);
      return { tagName: "a", attribs: { ...attribs, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) } };
    },
    img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy", alt: attribs.alt ?? "" } }),
  },
  // Images may only come from your own Cloudinary account (and its res.cloudinary.com host).
  exclusiveFilter: (frame) => frame.tag === "img" && !/^https:\/\/res\.cloudinary\.com\//.test(frame.attribs.src ?? ""),
};

export function sanitizeHtml(dirty: string): string {
  return sanitize(dirty, OPTIONS).trim();
}

/** For plain-text fields such as the title: removes every tag. */
export function stripHtml(input: string): string {
  return sanitize(input, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
}
