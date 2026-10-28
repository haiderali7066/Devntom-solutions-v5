import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { A, CO, Li, P, Table, Ul, BASE, type LegalSection } from "@/components/LegalLayout";

const TITLE = "Cookie Policy | Devntom Solutions";
const DESC = "What cookies are, which ones devntomsolutions.com uses, and how you can control them.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${BASE}/cookie-policy`, siteName: CO.name, title: TITLE, description: DESC },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

/* TODO: list the cookies your site really sets (check DevTools > Application > Cookies and your analytics,
   chat, map and video embeds). Rows appear automatically in section 4; leave the array empty to hide the table. */
const cookieList: { name: string; provider: string; purpose: string; duration: string; type: string }[] = [];

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What are cookies?",
    content: (
      <>
        <P>Cookies are small text files that a website saves on your device when you visit it. They let the site remember your actions and preferences, keep it secure, and help the owner understand how it is used. Similar technologies, such as local storage, pixels and tags, work in much the same way, and we refer to all of them as “cookies” in this policy.</P>
        <P>Cookies can be “session” cookies, which disappear when you close your browser, or “persistent” cookies, which stay until they expire or you delete them. They can be set by us (“first-party”) or by another company whose service we use (“third-party”).</P>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use cookies",
    content: (
      <Ul>
        <Li>To make the website work and keep it secure.</Li>
        <Li>To remember choices you make, such as your cookie preferences.</Li>
        <Li>To understand which pages are useful, how people find us and where the site can be faster or clearer.</Li>
        <Li>Where you agree, to measure the results of our marketing.</Li>
      </Ul>
    ),
  },
  {
    id: "categories",
    title: "Types of cookies",
    content: (
      <>
        <Table
          head={["Category", "What it does", "Can you refuse it?"]}
          rows={[
            ["Strictly necessary", "Keeps the site secure and working, and remembers your cookie choice. The site cannot function properly without them.", "No. These do not need consent."],
            ["Preferences", "Remembers settings such as language or form details, to give you a smoother experience.", "Yes"],
            ["Analytics", "Counts visits and shows how pages are used, usually in aggregated form, so we can improve the site.", "Yes"],
            ["Marketing", "Helps measure campaigns and show relevant content or ads on other platforms.", "Yes"],
          ]}
        />
        <P>Where the law requires consent (for example under the UK PECR and the EU ePrivacy rules), we only set preferences, analytics and marketing cookies after you agree.</P>
      </>
    ),
  },
  {
    id: "cookies-we-use",
    title: "Cookies on our site",
    content: cookieList.length ? (
      <Table head={["Name", "Provider", "Purpose", "Duration", "Type"]} rows={cookieList.map((c) => [c.name, c.provider, c.purpose, c.duration, c.type])} />
    ) : (
      <P>The exact cookies set on our website depend on the features you use and the choices you make. We review them regularly. If you would like a current list, email <A href={`mailto:${CO.email}`}>{CO.email}</A> and we will send it to you.</P>
    ),
  },
  {
    id: "third-party",
    title: "Third-party cookies",
    content: (
      <>
        <P>Some features of our website may load content or tools from other companies, such as analytics, embedded maps or videos, messaging widgets or social platforms. These companies may set their own cookies and receive information such as your IP address, under their own privacy policies. We encourage you to read them.</P>
        <P>If you follow a link from our site to a social network or another website, that site’s cookie and privacy rules apply, not ours.</P>
      </>
    ),
  },
  {
    id: "manage",
    title: "Managing cookies",
    content: (
      <>
        <P>You can control cookies in several ways:</P>
        <Ul>
          <Li><strong>Our cookie settings.</strong> Where we show a cookie banner or settings panel, you can accept, reject or customise non-essential cookies, and change your mind at any time.</Li>
          <Li><strong>Your browser.</strong> Most browsers let you block or delete cookies in their settings. Blocking strictly necessary cookies may stop parts of the site from working.</Li>
          <Li><strong>Your device or opt-out tools.</strong> Mobile and advertising settings, and industry opt-out tools, can limit tracking by some third parties.</Li>
        </Ul>
        <P>Deleting cookies removes your saved choices, so you may be asked again on your next visit.</P>
      </>
    ),
  },
  {
    id: "personal-data",
    title: "Personal data",
    content: <P>Some cookie data can identify you, for example an online identifier or IP address. Where it does, our <Link href="/privacy-policy" className="font-medium text-[#0052CC] underline decoration-[#93C5FD] underline-offset-4">Privacy Policy</Link> explains how we use it, who we share it with and your rights.</P>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: <P>We may update this Cookie Policy when we change the cookies we use or when the law changes. The “last updated” date at the top shows the latest version.</P>,
  },
  {
    id: "contact",
    title: "Contact us",
    content: <P>If you have questions about cookies or this policy, email <A href={`mailto:${CO.email}`}>{CO.email}</A> or call <A href={`tel:${CO.phones[0][2]}`}>{CO.phones[0][1]}</A>.</P>,
  },
];

export default function Page() {
  return <LegalLayout slug="cookie-policy" title="Cookie Policy" summary="What cookies are, why our website uses them, and how to choose which ones you accept." sections={sections} />;
}