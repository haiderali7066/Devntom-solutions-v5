/* Blog data layer. Every reader goes through the async functions at the bottom, so when your admin
   panel starts saving posts to a database or CMS you only change those functions, not the pages.
   The articles below are written for the site: edit, replace or add more. */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; text: string; cite?: string }
  | { t: "callout"; title: string; text: string }
  | { t: "code"; lang: string; code: string };

export const CATEGORIES = ["Web Development", "AI Automation", "Digital Marketing", "Business Growth"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  date: string;      // ISO, first published
  updated?: string;  // ISO, last edited
  author: { name: string; role: string };
  featured?: boolean;
  cover?: string;    // optional image path; without it a generated cover is drawn
  seoTitle?: string;
  seoDescription?: string;
  body: Block[];
};

export type PostMeta = Pick<Post, "slug" | "title" | "excerpt" | "category" | "tags" | "date" | "featured"> & { readMins: number };

const AUTHOR = { name: "DEVNTOM Team", role: "Engineering and strategy" };

const POSTS: Post[] = [
  /* ───────────────────────── 1 ───────────────────────── */
  {
    slug: "zatca-e-invoicing-qr-codes-explained",
    title: "ZATCA e-invoicing QR codes explained: fields, TLV and Base64",
    excerpt: "Selling in Saudi Arabia? Here is what the ZATCA invoice QR code contains, how the TLV and Base64 encoding works, and how to generate one correctly.",
    category: "Business Growth",
    tags: ["ZATCA", "Saudi Arabia", "E-invoicing", "QR code"],
    date: "2026-10-15",
    author: AUTHOR,
    seoTitle: "ZATCA QR Code Explained: Fields, TLV and Base64",
    body: [
      { t: "p", text: "If you issue invoices in Saudi Arabia, you will meet the ZATCA (Zakat, Tax and Customs Authority) e-invoicing rules. One visible part of them is the QR code printed on the invoice. It looks like a normal QR code, but what is inside it is very specific, and a small mistake in the encoding makes it fail validation." },
      { t: "callout", title: "Check the current rules", text: "E-invoicing requirements are introduced in phases and updated over time. Use this article to understand how the QR code works, and confirm the latest obligations for your business with ZATCA’s official documentation and your accountant." },
      { t: "h2", text: "What the QR code is for" },
      { t: "p", text: "The QR code lets a customer, an inspector or a scanning app read the key facts of an invoice instantly and check that they match the printed document. It was required on simplified tax invoices, the invoices a business issues to consumers, from the first phase of the e-invoicing rollout (the “generation” phase), and the later “integration” phase adds further requirements." },
      { t: "h2", text: "The five fields in the basic QR code" },
      { t: "ol", items: [
        "**Seller name**, exactly as registered.",
        "**VAT registration number** of the seller.",
        "**Invoice date and time**, in ISO 8601 format, for example `2026-10-15T09:30:00Z`.",
        "**Invoice total** including VAT.",
        "**VAT amount** on the invoice.",
      ] },
      { t: "p", text: "The later phase adds more data, such as a hash of the invoice and a cryptographic stamp, so check the current technical specification if your business has reached that phase." },
      { t: "h2", text: "What TLV means" },
      { t: "p", text: "TLV stands for **Tag, Length, Value**. Each field is stored as three parts, one after the other:" },
      { t: "ul", items: ["**Tag:** one byte that says which field this is (1 for seller name, 2 for VAT number, and so on up to 5).", "**Length:** one byte that says how many bytes the value takes.", "**Value:** the field itself, written as UTF-8 bytes."] },
      { t: "p", text: "You join the five TLV blocks into one sequence of bytes. Then you turn that whole sequence into **Base64** text. That Base64 string is what you put into the QR code." },
      { t: "h2", text: "A working example" },
      { t: "code", lang: "ts", code: "function tlv(tag: number, value: string) {\n  const bytes = new TextEncoder().encode(value); // UTF-8, so Arabic names work\n  return Uint8Array.from([tag, bytes.length, ...bytes]);\n}\n\nexport function zatcaBase64(f: { seller: string; vat: string; time: string; total: string; vatAmount: string }) {\n  const parts = [tlv(1, f.seller), tlv(2, f.vat), tlv(3, f.time), tlv(4, f.total), tlv(5, f.vatAmount)];\n  const all = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));\n  let offset = 0;\n  for (const p of parts) { all.set(p, offset); offset += p.length; }\n  return btoa(String.fromCharCode(...all)); // put this string in the QR code\n}" },
      { t: "p", text: "Notice that the length is measured in **bytes**, not characters. An Arabic seller name uses more bytes than letters, which is the most common cause of a wrong length byte." },
      { t: "h2", text: "Common mistakes" },
      { t: "ul", items: ["Counting characters instead of bytes for the length.", "Leaving the VAT amount out, or using the total before VAT.", "A timestamp in the wrong format.", "Putting the TLV text in the QR code instead of the Base64 version of it.", "A QR code printed too small to scan reliably."] },
      { t: "h2", text: "Skip the manual work" },
      { t: "p", text: "You can build this into your own invoicing system, or use our [ZATCA QR code generator](/tools/zatca-qr-code-generator) to create and download a correctly encoded code from your invoice details. If you need e-invoicing built into your software, [talk to our team](/contact)." },
    ],
  },

  /* ───────────────────────── 2 ───────────────────────── */
  {
    slug: "how-much-does-a-website-cost",
    title: "How much does a website really cost? What moves the price",
    excerpt: "A website can cost very little or a great deal. Here are the factors that decide where yours lands, the questions that expose hidden costs, and how to get an accurate quote.",
    category: "Web Development",
    tags: ["Website cost", "Planning", "Quotes"],
    date: "2026-10-08",
    author: AUTHOR,
    featured: true,
    seoTitle: "How Much Does a Website Cost? What Moves the Price",
    body: [
      { t: "p", text: "There is no single price for a website, because “a website” can mean a five-page brochure or a platform with customer accounts, payments and integrations. What you pay depends on what the site needs to do for your business, so the useful question is not “how much?” but “what drives the price?”" },
      { t: "h2", text: "Three kinds of website, three kinds of project" },
      { t: "ul", items: [
        "**A brochure site.** Five to ten pages, a contact form, edited rarely. The simplest and quickest to build.",
        "**A business website with a CMS.** Service pages, a blog, case studies, several page templates and an editor your team uses every week. Needs more design, structure and testing.",
        "**A custom platform.** Customer accounts, payments, dashboards or integrations with other systems. This is software engineering as much as web design.",
      ] },
      { t: "h2", text: "The five things that set the price" },
      { t: "ol", items: [
        "**Scope.** The number of pages and unique page layouts. Ten pages that share three layouts cost far less than ten that are each designed from scratch.",
        "**Design.** A template-based design is faster to produce than a custom, brand-led one with motion and illustration.",
        "**Functionality.** Contact forms are simple. Booking, online payments, user accounts, search and integrations with a CRM add real engineering work.",
        "**Content.** Who writes the copy, takes the photos and handles translations? Content is often the slowest part of a project.",
        "**Platform and performance.** A CMS your team can edit, strong SEO foundations, accessibility and speed targets all take planning and testing.",
      ] },
      { t: "h2", text: "Where money is usually wasted" },
      { t: "ul", items: [
        "Starting without a clear scope, then paying for changes midway.",
        "Skipping discovery and building the wrong thing very well.",
        "Cheap hosting and heavy images that make a good design feel slow.",
        "No plan for who will keep the content fresh after launch.",
      ] },
      { t: "callout", title: "Ask for a fixed quote", text: "A good agency gives you a fixed quote with the deliverables listed and a dated project plan. If a price arrives without either, ask what is and is not included." },
      { t: "h2", text: "Questions that reveal hidden costs" },
      { t: "ul", items: [
        "Who owns the design and code when the project is finished?",
        "How many rounds of revisions are included?",
        "What will hosting, licences and plugins cost each year?",
        "Who updates the site after launch, and how much does that cost?",
        "What happens to the price if the scope changes?",
      ] },
      { t: "h2", text: "How to get an accurate quote" },
      { t: "p", text: "The more clearly you describe the project, the closer the first quote will be to the final one. Share your goals and how you will measure success, who your customers are, the features you must have, two or three websites you like and why, your timeline, and a budget range. A budget range is not a trap. It helps the agency recommend the right approach instead of guessing." },
      { t: "h2", text: "Costs after launch" },
      { t: "p", text: "Plan for domain and hosting renewals, security and software updates, and ongoing improvements such as new pages, SEO and performance tuning. Many agencies offer a care plan so these are handled for a predictable monthly fee." },
      { t: "p", text: "For a first estimate, try our [website cost calculator](/tools/website-cost-calculator). When you are ready for a real quote, [tell us what you need](/contact) and we will reply with a plan, a timeline and a price." },
    ],
  },

  /* ───────────────────────── 3 ───────────────────────── */
  {
    slug: "website-redesign-without-losing-seo",
    title: "How to redesign your website without losing your Google rankings",
    excerpt: "A redesign can wipe out years of search traffic in a day. Follow this plan to keep what works, redirect what moves and launch safely.",
    category: "Web Development",
    tags: ["Redesign", "SEO", "Migration", "Redirects"],
    date: "2026-09-30",
    author: AUTHOR,
    body: [
      { t: "p", text: "A new design is exciting, but search engines do not care how the site looks. They care whether the pages that earned rankings are still there, still say the same useful things, and still load fast. Most traffic drops after a redesign come from a handful of avoidable mistakes." },
      { t: "h2", text: "Before you change anything" },
      { t: "ol", items: [
        "**Crawl the current site** and export every URL, title, heading and status code.",
        "**Find the pages that matter.** In Google Search Console and your analytics, list the pages that bring traffic, leads and backlinks.",
        "**Decide what stays, merges or goes.** Not every old page deserves a place on the new site, but every removal needs a plan.",
        "**Save a backup** of the old site and its content.",
      ] },
      { t: "h2", text: "Keep what already works" },
      { t: "p", text: "If a page ranks well, think twice before changing its URL, title, main heading or core content. A better design can sit around the same words and the same address. Improve the page, do not reinvent it." },
      { t: "h2", text: "Plan your redirects" },
      { t: "p", text: "Whenever an address changes, the old one must send visitors and search engines to the new one with a permanent (301) redirect." },
      { t: "ul", items: [
        "Redirect each old URL to the most relevant new page, one to one.",
        "Avoid chains (A to B to C), and avoid sending everything to the home page.",
        "Update internal links so they point to the final URLs.",
        "Keep the redirects in place for at least a year.",
      ] },
      { t: "code", lang: "js", code: "// next.config.js\nmodule.exports = {\n  async redirects() {\n    return [\n      { source: \"/old-services\", destination: \"/services\", permanent: true },\n      { source: \"/blog/2019/:slug\", destination: \"/blog/:slug\", permanent: true },\n    ];\n  },\n};" },
      { t: "p", text: "With hundreds of URLs, build the list in a spreadsheet and generate the rules automatically with our [redirect map generator](/tools/redirect-map-generator)." },
      { t: "callout", title: "The most common launch mistake", text: "Staging sites are usually set to “noindex” or blocked in robots.txt so they stay out of Google. If those settings are copied to the live site, your pages will drop out of search. Check both on launch day." },
      { t: "h2", text: "Launch-day checks" },
      { t: "ul", items: [
        "Redirects work, and key old URLs return a 301 to the right page.",
        "The live site is indexable, with no accidental `noindex` and no blocking in `robots.txt`.",
        "Titles, descriptions, headings and structured data carried over.",
        "The sitemap is updated and submitted in Search Console.",
        "Analytics and conversion tracking are firing.",
        "The new pages pass a speed and mobile test.",
      ] },
      { t: "h2", text: "After launch" },
      { t: "p", text: "Watch Search Console for crawl errors and 404s every day for the first week, then weekly for a couple of months. Fix broken links quickly, compare traffic for your key pages with the period before launch, and expect some short-term movement while search engines re-crawl the site." },
      { t: "p", text: "Planning a redesign? [Talk to us](/contact) and we will include an SEO migration plan from day one." },
    ],
  },

  /* ───────────────────────── 4 ───────────────────────── */
  {
    slug: "core-web-vitals-explained",
    title: "Core Web Vitals in plain English: LCP, INP and CLS",
    excerpt: "Three numbers describe how fast and stable your pages feel to real visitors. Here is what they mean, the targets to aim for, and the fixes that work.",
    category: "Web Development",
    tags: ["Performance", "Core Web Vitals", "Next.js"],
    date: "2026-09-24",
    author: AUTHOR,
    body: [
      { t: "p", text: "Core Web Vitals are three measurements Google uses to describe how a page feels to real visitors: how fast the main content appears, how quickly the page reacts, and how stable the layout stays." },
      { t: "h2", text: "The three metrics" },
      { t: "h3", text: "LCP: Largest Contentful Paint" },
      { t: "p", text: "LCP measures how long it takes for the biggest visible element, usually a hero image or headline, to render. **Good: 2.5 seconds or less.**" },
      { t: "h3", text: "INP: Interaction to Next Paint" },
      { t: "p", text: "INP measures how quickly the page responds when someone taps, clicks or types, across the whole visit. **Good: 200 milliseconds or less.** It replaced First Input Delay as a Core Web Vital in March 2024." },
      { t: "h3", text: "CLS: Cumulative Layout Shift" },
      { t: "p", text: "CLS measures unexpected movement, such as a button jumping because an image loaded late. **Good: 0.1 or less.**" },
      { t: "p", text: "Google assesses these at the 75th percentile of real visits, so three out of four visits need to meet each threshold." },
      { t: "h2", text: "What usually makes pages slow" },
      { t: "ul", items: ["Oversized or unoptimised images.", "Too much JavaScript loading up front.", "Web fonts that block rendering.", "Third-party scripts such as chat widgets and trackers.", "No caching or content delivery network (CDN)."] },
      { t: "h2", text: "Fixes that work" },
      { t: "ul", items: ["Serve modern, correctly sized images and load the hero image with priority.", "Split code so each page loads only what it needs.", "Reserve space for images, ads and embeds so the layout never jumps.", "Delay non-essential third-party scripts until after the page is usable.", "Host on infrastructure with a CDN."] },
      { t: "code", lang: "tsx", code: "import Image from \"next/image\";\n\nexport function Hero() {\n  return (\n    <Image\n      src=\"/hero.jpg\"\n      alt=\"Team reviewing a new website design\"\n      width={1600}\n      height={900}\n      priority // the hero is usually the LCP element\n      sizes=\"(min-width: 1024px) 1200px, 100vw\"\n    />\n  );\n}" },
      { t: "p", text: "Setting `width` and `height` also reserves the space, which protects your CLS score." },
      { t: "h2", text: "A simple routine" },
      { t: "ol", items: ["Check real-visitor data in PageSpeed Insights or the Core Web Vitals report in Search Console.", "Find the element that is your LCP, usually the hero image or headline.", "Reduce the JavaScript that runs before the page is usable.", "Fix anything that shifts the layout.", "Re-test after every significant change, because new scripts and images bring problems back."] },
      { t: "callout", title: "Lab data and real data differ", text: "Lighthouse is a lab test. Core Web Vitals come from real visits. A perfect Lighthouse score is a great sign, but check both." },
    ],
  },

  /* ───────────────────────── 5 ───────────────────────── */
  {
    slug: "local-seo-for-service-businesses",
    title: "Local SEO for service businesses: how to show up “near me”",
    excerpt: "When customers search for a service nearby, a handful of businesses win the map and the first page. Here is what puts you among them.",
    category: "Digital Marketing",
    tags: ["Local SEO", "Google Business Profile", "Reviews"],
    date: "2026-09-18",
    author: AUTHOR,
    body: [
      { t: "p", text: "Local search is where intent is strongest. Someone searching for “web developer in Lahore” or “accountant near me” usually wants to hire this week. Google answers with a map and a short list of businesses, and getting onto that list is worth the effort." },
      { t: "h2", text: "What Google looks at" },
      { t: "p", text: "Google describes local ranking in three ideas: **relevance** (how well your profile matches the search), **distance** (how close you are to the searcher), and **prominence** (how well known and trusted you are). You cannot change distance, but you can improve the other two." },
      { t: "h2", text: "Step 1: Build a complete Google Business Profile" },
      { t: "ul", items: [
        "Claim and verify your profile.",
        "Choose the most accurate primary category, and add secondary ones that really apply.",
        "Add your services, opening hours, phone number, website and a clear description.",
        "Upload real photos of your team, work and premises.",
        "Keep everything up to date, including holiday hours.",
      ] },
      { t: "h2", text: "Step 2: Keep your name, address and phone consistent" },
      { t: "p", text: "Your business name, address and phone number should be written the same way on your website, your profile and every directory. Inconsistent details confuse both customers and search engines." },
      { t: "h2", text: "Step 3: Build pages for the places you serve" },
      { t: "p", text: "A page for each location or service area, with unique and useful content, helps you appear for searches in that place. Describe the real work you do there, add local details and avoid copying the same text with the city name swapped." },
      { t: "p", text: "If you operate in several countries or cities, give each office its own profile and its own page. Mark them up with structured data:" },
      { t: "code", lang: "json", code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"LocalBusiness\",\n  \"name\": \"Your Business\",\n  \"telephone\": \"+00 000 0000000\",\n  \"url\": \"https://www.example.com\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"Street and number\",\n    \"addressLocality\": \"Lahore\",\n    \"addressCountry\": \"PK\"\n  }\n}" },
      { t: "h2", text: "Step 4: Earn reviews the honest way" },
      { t: "ul", items: ["Ask every happy customer, ideally soon after the job is done, with a direct link to your review page.", "Reply to all reviews, good and bad, politely and specifically.", "Never buy, fake or trade reviews, because it breaks Google’s rules and customers can tell."] },
      { t: "h2", text: "Step 5: Be useful on your website" },
      { t: "p", text: "Show your address, hours and a map, make it easy to call or message you, and publish content that answers local questions. A fast, mobile-friendly site supports everything above." },
      { t: "callout", title: "Be patient", text: "Local rankings improve as your profile, reviews and website build trust together. Expect steady gains over months, not days." },
    ],
  },

  /* ───────────────────────── 6 ───────────────────────── */
  {
    slug: "nextjs-vs-wordpress",
    title: "Next.js or WordPress: which is right for your business?",
    excerpt: "Both can power an excellent website. The better choice depends on your team, your goals and how much custom behaviour you need.",
    category: "Web Development",
    tags: ["Next.js", "WordPress", "CMS"],
    date: "2026-09-10",
    author: AUTHOR,
    body: [
      { t: "p", text: "WordPress and Next.js are often compared as if one must win. In reality they solve different problems, and plenty of strong websites use either, or both together." },
      { t: "h2", text: "Where WordPress is strong" },
      { t: "ul", items: ["A huge ecosystem of themes and plugins for common needs.", "Editing that non-technical teams already know.", "Quick to launch a standard business site.", "A large pool of developers and agencies."] },
      { t: "h2", text: "Where Next.js is strong" },
      { t: "ul", items: ["Speed by default, through server rendering and static generation.", "Full control over design, behaviour and user experience.", "A natural fit for custom features, dashboards and app-like experiences.", "Less dependence on third-party plugins, so fewer update conflicts."] },
      { t: "h2", text: "Costs and trade-offs" },
      { t: "p", text: "WordPress is usually cheaper to start for a simple site. Over time, plugin conflicts, heavy themes and security updates can add maintenance work. Next.js takes more effort to build, and changes need a developer unless it is paired with a content management system your team can edit." },
      { t: "h2", text: "Questions to ask yourself" },
      { t: "ul", items: [
        "Who will edit the site every week, and how technical are they?",
        "Do we need features that do not exist as trusted plugins?",
        "How important is speed to our customers and to search?",
        "Do we have, or can we hire, ongoing technical support?",
        "Will the website grow into a product, with accounts, dashboards or integrations?",
      ] },
      { t: "h2", text: "How to choose" },
      { t: "ul", items: [
        "**Choose WordPress** if you need a standard site quickly, your team will edit it daily, and the features you need already exist as trusted plugins.",
        "**Choose Next.js** if speed, a distinctive design or custom functionality are central to the business.",
        "**Consider both.** Next.js with a headless CMS gives editors a familiar interface while visitors get a fast, flexible front end.",
      ] },
      { t: "callout", title: "Start from the goal", text: "Decide what the website must achieve and who will maintain it. The platform should follow from that, not the other way round." },
      { t: "p", text: "Not sure which fits? [Talk to us](/contact) and we will recommend an approach for your project, even if it is not the one we would build." },
    ],
  },

  /* ───────────────────────── 7 ───────────────────────── */
  {
    slug: "website-accessibility-basics",
    title: "Website accessibility basics: ten fixes that help everyone",
    excerpt: "Accessible websites reach more people, convert better and rank more easily. These ten fixes cover most of what matters, with a simple way to test them.",
    category: "Web Development",
    tags: ["Accessibility", "WCAG", "UX"],
    date: "2026-09-02",
    author: AUTHOR,
    body: [
      { t: "p", text: "Web accessibility means building sites that people can use whatever their abilities, device or situation. That includes people who use screen readers or keyboards, people with low vision or colour blindness, and anyone squinting at a phone in bright sunlight. Accessible design is good design, and most of it also helps search engines understand your pages." },
      { t: "h2", text: "The standard to aim for" },
      { t: "p", text: "The widely used reference is the Web Content Accessibility Guidelines (WCAG), and most organisations aim for **level AA**. Accessibility laws and expectations differ by country, so check what applies to your business, but the practical fixes below are a strong foundation anywhere." },
      { t: "h2", text: "Ten fixes with the biggest impact" },
      { t: "ol", items: [
        "**Enough colour contrast.** Normal text needs a contrast ratio of at least 4.5 to 1 against its background, and large text and interface parts at least 3 to 1.",
        "**Full keyboard access.** Everything you can click must work with Tab, Enter and Escape, and the focus indicator must always be visible.",
        "**Meaningful alt text.** Describe images that carry information, and leave the alt empty for purely decorative ones.",
        "**Labelled form fields.** Every input needs a visible label, and error messages should say what went wrong and how to fix it.",
        "**A logical heading order.** One `h1`, then `h2` and `h3` in a sensible hierarchy, so people can navigate by headings.",
        "**Descriptive link text.** “Read our pricing guide” works for everyone. “Click here” does not.",
        "**Never rely on colour alone.** Add an icon or text so that errors and states are clear to colour-blind users.",
        "**Captions and transcripts** for video and audio.",
        "**Respect reduced motion.** Offer a calmer experience to people who turn animation off in their system settings.",
        "**Comfortable touch targets.** Make buttons and links large enough to tap, at least 24 by 24 pixels under WCAG 2.2, and larger is better.",
      ] },
      { t: "code", lang: "css", code: ":focus-visible {\n  outline: 2px solid #0A5CFF;\n  outline-offset: 3px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}" },
      { t: "h2", text: "How to test" },
      { t: "ul", items: [
        "Put your mouse aside and use the whole site with only the keyboard.",
        "Zoom the page to 200 percent and check that nothing breaks.",
        "Try a screen reader on your key pages, such as VoiceOver on Apple devices or NVDA on Windows.",
        "Run automated tools like Lighthouse or axe, which catch many issues but not all of them.",
      ] },
      { t: "callout", title: "Build it in, do not bolt it on", text: "Fixing accessibility after launch costs more than designing for it. Agree on accessibility goals in the brief, and test as you build." },
    ],
  },

  /* ───────────────────────── 8 ───────────────────────── */
  {
    slug: "ai-automation-business-processes",
    title: "Five business processes you can automate with AI this quarter",
    excerpt: "Start with work that is frequent, repetitive and low risk. These five processes are where most teams see time come back first.",
    category: "AI Automation",
    tags: ["AI automation", "Workflows", "Productivity"],
    date: "2026-08-27",
    author: AUTHOR,
    body: [
      { t: "p", text: "AI automation means connecting software workflows with AI models so repetitive work happens without someone doing it by hand. The best first projects are frequent, rule-based and easy to check." },
      { t: "h2", text: "Five places to start" },
      { t: "h3", text: "1. Lead qualification and routing" },
      { t: "p", text: "Incoming forms and emails are classified, enriched with company details and sent to the right person with a suggested reply, so no enquiry waits in a shared inbox." },
      { t: "h3", text: "2. Customer support triage" },
      { t: "p", text: "Tickets are categorised by topic and urgency, and answers are drafted from your help documents for an agent to review and send." },
      { t: "h3", text: "3. Document and invoice processing" },
      { t: "p", text: "Key fields are extracted from PDFs and emails, then checked and sent into your accounting or CRM system." },
      { t: "h3", text: "4. Reporting and summaries" },
      { t: "p", text: "Data is pulled from your tools every week and turned into a short summary of what changed and what needs attention." },
      { t: "h3", text: "5. Internal knowledge search" },
      { t: "p", text: "Staff ask questions in plain language and get answers from policies, proposals and past projects, with links to the source." },
      { t: "h2", text: "Keep a human in the loop" },
      { t: "p", text: "AI can be wrong, so design for that from the start:" },
      { t: "ul", items: ["Have a person review anything that reaches a customer until you trust the results.", "Log what the automation did so you can audit it.", "Provide a clear fallback when the system is not confident.", "Keep sensitive data out of tools you have not checked for privacy and security."] },
      { t: "h2", text: "How to start well" },
      { t: "ol", items: ["Pick one process that costs real time every week.", "Measure the baseline: hours spent and errors made today.", "Build the smallest workflow that does the job.", "Run it alongside the manual process and compare.", "Expand only when the numbers justify it."] },
      { t: "callout", title: "Measure the saving", text: "Automation is only worth it if the time saved is measurable. Agree how you will measure it before you build." },
      { t: "p", text: "Want help finding the first process worth automating? [Book a conversation](/contact) and we will map it with you." },
    ],
  },

  /* ───────────────────────── 9 ───────────────────────── */
  {
    slug: "chatbot-ai-agent-or-workflow",
    title: "Chatbot, AI agent or workflow: which one does your business need?",
    excerpt: "The words get mixed up, but the three are different tools with different risks and costs. Here is how to choose the simplest one that does the job.",
    category: "AI Automation",
    tags: ["AI agents", "Chatbots", "Automation"],
    date: "2026-08-20",
    author: AUTHOR,
    body: [
      { t: "p", text: "“We want an AI agent” is a common request, and often the real need is simpler. Chatbots, workflows and agents solve different problems, and picking the wrong one is how projects become expensive, slow or unreliable." },
      { t: "h2", text: "The three in plain terms" },
      { t: "h3", text: "Workflow: a fixed path" },
      { t: "p", text: "A workflow follows steps you define: when a form arrives, classify it, look up the customer, create a task, send a reply. AI may power one or two of the steps, but the route is fixed. This is the most predictable and the easiest to test." },
      { t: "h3", text: "Chatbot: a conversation" },
      { t: "p", text: "A chatbot is an interface where people ask questions and get answers, usually from your own documents. It is ideal for support questions, product guidance and internal help desks." },
      { t: "h3", text: "Agent: a goal and some tools" },
      { t: "p", text: "An agent is given a goal and a set of tools, and decides for itself which steps to take, for example researching a topic, drafting a report and updating a record. It is flexible, and also the hardest to keep reliable." },
      { t: "h2", text: "How to choose" },
      { t: "ul", items: [
        "**Do you know the steps in advance?** Use a workflow.",
        "**Do people mainly need answers from your content?** Use a chatbot grounded in your documents.",
        "**Is the task open-ended and different every time?** Consider an agent, with strict limits.",
      ] },
      { t: "p", text: "Many good solutions combine them: a chatbot answers questions, and when someone wants a quote it hands off to a workflow that creates the lead." },
      { t: "h2", text: "What to ask before you build" },
      { t: "ol", items: [
        "What decision or task are we improving, and how will we measure it?",
        "What is the cost of a wrong answer?",
        "Which of our data does it need, and who may see it?",
        "Where does a human check or take over?",
        "How will we test it with real examples before customers see it?",
      ] },
      { t: "callout", title: "Start with the simplest thing that works", text: "A well-built workflow often delivers most of the value of an agent, with far less risk. Add autonomy only where the task truly needs it." },
      { t: "p", text: "Not sure which you need? [Describe the problem](/contact) and we will recommend the simplest approach." },
    ],
  },

  /* ───────────────────────── 10 ───────────────────────── */
  {
    slug: "seo-launch-checklist",
    title: "A launch-day SEO checklist for new websites",
    excerpt: "Most launch-day SEO problems are avoidable. Work through this list before you go live and again the week after.",
    category: "Digital Marketing",
    tags: ["SEO", "Launch", "Checklist"],
    date: "2026-08-13",
    author: AUTHOR,
    body: [
      { t: "p", text: "A new website can look perfect and still be invisible to search engines because of one forgotten setting. This checklist covers the basics we verify on every launch." },
      { t: "h2", text: "Technical foundations" },
      { t: "ul", items: [
        "The site is served over HTTPS.",
        "Pages are indexable: no accidental `noindex` tags and nothing important blocked in `robots.txt`.",
        "An XML sitemap exists and is submitted to Search Console.",
        "Every page has a canonical URL.",
        "Old URLs redirect to their new equivalents with permanent (301) redirects.",
        "The site is fast and works well on mobile.",
        "A helpful custom 404 page guides visitors back.",
      ] },
      { t: "h2", text: "On-page basics" },
      { t: "ul", items: ["A unique title of about 60 characters and a description of about 150 to 160 characters on every page.", "One `h1` per page, followed by a logical order of `h2` and `h3` headings.", "Descriptive internal links with meaningful anchor text.", "Useful alt text on meaningful images.", "Short, readable URLs."] },
      { t: "h2", text: "Structured data and metadata" },
      { t: "p", text: "In Next.js, set metadata per page, and add JSON-LD for your organisation and for page types such as articles, services and FAQs." },
      { t: "code", lang: "tsx", code: "export const metadata = {\n  title: \"Website Development | DEVNTOM Solutions\",\n  description: \"Fast, search-ready websites built with Next.js.\",\n  alternates: { canonical: \"/services/website-development\" },\n};" },
      { t: "h2", text: "Content" },
      { t: "ul", items: ["Each page targets one clear topic and answers the question behind the search.", "Important pages are linked from the main navigation or from related pages.", "There is no leftover placeholder text or thin, duplicate content."] },
      { t: "h2", text: "Tracking and local search" },
      { t: "ul", items: ["Connect Google Search Console and your analytics before launch.", "Create or update your Google Business Profile, with the same name, address and phone number as your website."] },
      { t: "h2", text: "After launch" },
      { t: "p", text: "Check indexing and crawl errors in Search Console during the first weeks, fix anything flagged, and keep publishing helpful content around the questions your customers actually ask." },
      { t: "callout", title: "SEO is a habit", text: "A clean launch gives you a strong start. Rankings grow from consistent, useful content and a fast, well-structured site over time." },
    ],
  },

  /* ───────────────────────── 11 ───────────────────────── */
  {
    slug: "landing-page-conversion-checklist",
    title: "A landing page checklist: ten things that turn visitors into leads",
    excerpt: "You can pay for traffic, but you cannot pay for it to convert. Use this checklist to build a landing page that gives every visit a fair chance.",
    category: "Digital Marketing",
    tags: ["Landing pages", "Conversion", "Lead generation"],
    date: "2026-08-06",
    author: AUTHOR,
    body: [
      { t: "p", text: "A landing page has one job: to get a visitor to take one action. When campaigns underperform, the problem is often not the ad but the page it points to. This checklist covers what to get right before you spend on traffic." },
      { t: "h2", text: "The ten-point checklist" },
      { t: "ol", items: [
        "**One goal.** Pick a single action, such as booking a call or requesting a quote, and make everything support it.",
        "**Message match.** The headline should repeat the promise of the ad or link that brought people here.",
        "**A clear headline and sub-headline.** In a few seconds a visitor should know what you offer, who it is for and what happens next.",
        "**Benefits before features.** Say what changes for the customer, then explain how.",
        "**Real proof.** Genuine testimonials, client logos you have permission to show, results and case studies. Never invent them.",
        "**A visible call to action.** Use a specific label like “Get my quote”, repeat it down the page, and keep it above the fold on mobile.",
        "**A short form.** Ask only for what you need to follow up. Every extra field loses some people.",
        "**Answers to objections.** A short FAQ about price, timing and process removes doubts.",
        "**Speed and mobile polish.** Most visits come from phones, so test on a real device and keep the page fast.",
        "**Tracking.** Record form submissions, calls and clicks so you know which campaigns actually produce leads.",
      ] },
      { t: "h2", text: "Remove distractions" },
      { t: "p", text: "A landing page does not need the full site menu, social feeds or unrelated links. Each exit gives visitors a reason to leave. Keep a logo and the contact details, and keep the path to the goal clear." },
      { t: "h2", text: "Test one change at a time" },
      { t: "ul", items: ["Change a single element, such as the headline or button text, then compare results.", "Wait for enough visits before judging, because small numbers mislead.", "Keep a log of what you tested and what you learned."] },
      { t: "callout", title: "Send paid traffic to a page built for it", text: "Sending ad clicks to a generic home page splits attention across many goals. A focused page usually converts better and shows you what works." },
      { t: "p", text: "We design and build landing pages that load fast and convert. [Tell us about your campaign](/contact) and we will suggest a plan." },
    ],
  },

  /* ───────────────────────── 12 ───────────────────────── */
  {
    slug: "how-to-brief-a-web-agency",
    title: "How to brief a web design agency and get an accurate quote",
    excerpt: "A clear brief saves weeks. Here is what to include, the questions to ask an agency, and the warning signs to watch for.",
    category: "Business Growth",
    tags: ["Agency", "Briefing", "Planning"],
    date: "2026-07-30",
    author: AUTHOR,
    body: [
      { t: "p", text: "The quality of a website project is shaped long before design starts. A good brief helps an agency understand your business, price the work fairly and avoid surprises." },
      { t: "h2", text: "What a good brief includes" },
      { t: "ol", items: [
        "**About your business:** what you do and who you serve.",
        "**Goals:** what the website must achieve and how you will measure it.",
        "**Audience:** who visits and what they need to do.",
        "**Scope:** the pages and must-have features.",
        "**Content and assets:** what you have and what still needs creating.",
        "**References:** sites you like and dislike, with reasons.",
        "**Timeline:** key dates such as a launch or campaign.",
        "**Budget range:** even an approximate one.",
        "**Decision process:** who approves work and how quickly.",
      ] },
      { t: "h2", text: "Questions to ask the agency" },
      { t: "ul", items: ["How will you learn about our customers before designing?", "Is the quote fixed, and what exactly does it include?", "What happens after launch, and who supports us?", "Who will we talk to week to week?", "Can we see similar work?"] },
      { t: "h2", text: "Red flags" },
      { t: "ul", items: ["A price with no list of deliverables.", "No questions about your goals or customers.", "No plan for testing, speed or accessibility.", "Unclear ownership of the finished design and code.", "Pressure to sign quickly."] },
      { t: "h2", text: "Make decisions easier" },
      { t: "p", text: "Name one person who can say yes, collect feedback into a single list rather than many separate messages, and agree review dates at the start. Slow decisions are the most common reason projects overrun." },
      { t: "callout", title: "Ownership matters", text: "Confirm in writing that you own the finished design and code once the project is paid for." },
      { t: "p", text: "Ready to brief us? [Send your project details](/contact) and we will come back with a plan, a timeline and a quote." },
    ],
  },
];

/* ---- helpers ---- */
export const wordCount = (p: Post) =>
  p.body.reduce((n, b) => {
    const text = b.t === "ul" || b.t === "ol" ? b.items.join(" ") : b.t === "callout" ? b.title + " " + b.text : b.t === "code" ? "" : b.text;
    return n + text.split(/\s+/).filter(Boolean).length;
  }, 0);
export const readingMins = (p: Post) => Math.max(1, Math.round(wordCount(p) / 220));
export const toMeta = (p: Post): PostMeta => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, tags: p.tags, date: p.date, featured: p.featured, readMins: readingMins(p) });
export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---- the only functions the pages call: swap their bodies for a database or CMS later ---- */
export async function getAllPosts(): Promise<Post[]> {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getPost(slug: string): Promise<Post | null> {
  return POSTS.find((p) => p.slug === slug) ?? null;
}
export async function getRelated(post: Post, n = 3): Promise<Post[]> {
  const score = (p: Post) => (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return (await getAllPosts()).filter((p) => p.slug !== post.slug).sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date)).slice(0, n);
}
