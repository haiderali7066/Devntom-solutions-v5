import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { A, Callout, CO, Li, P, Ul, BASE, type LegalSection } from "@/components/LegalLayout";

const TITLE = "Terms and Conditions | DEVNTOM Solutions";
const DESC = "The terms that apply when you use devntomsolutions.com or hire DEVNTOM Solutions for web, software, app, AI, design, marketing or SEO work.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${BASE}/terms-and-conditions`, siteName: CO.name, title: TITLE, description: DESC, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Devntom Solutions" }] },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

const lnk = "font-medium text-[#0052CC] underline decoration-[#93C5FD] underline-offset-4";

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    content: (
      <>
        <P>These terms are between you and {CO.name} (“we”, “us”, “our”). They have two parts: <strong>Part A</strong> covers your use of our website, and <strong>Part B</strong> covers services we provide to you as a client.</P>
        <Callout>If you sign a written agreement or accept a proposal with us, that document takes priority over these terms wherever the two differ. By using our website or engaging us, you confirm that you have read and agree to these terms.</Callout>
      </>
    ),
  },
  {
    id: "website-use",
    title: "Part A: Using our website",
    content: (
      <>
        <P>You may use our website for lawful purposes only. You agree not to:</P>
        <Ul>
          <Li>attempt to gain unauthorised access to the site, our systems or other users’ data;</Li>
          <Li>introduce malware, scrape the site in a way that harms its performance, or interfere with its operation;</Li>
          <Li>use the site to send unlawful, misleading or abusive messages, or to submit false information in our forms.</Li>
        </Ul>
        <P>We try to keep the information on our website accurate and up to date, but it is general information and not professional advice. We may change or remove content at any time. Links to third-party sites are provided for convenience and we are not responsible for their content.</P>
      </>
    ),
  },
  {
    id: "ip-website",
    title: "Our website content",
    content: <P>The design, text, graphics, logos, code and other material on our website belong to {CO.name} or its licensors and are protected by intellectual property laws. You may view the site and share links to it, but you may not copy, reproduce or republish its content for commercial use without our written permission.</P>,
  },
  {
    id: "services",
    title: "Part B: Our services",
    content: (
      <>
        <P>We provide website development, custom software development, mobile app development, AI automation, digital marketing, UI/UX design and SEO services. The specific services, deliverables, timeline and price for your project are set out in a written proposal, quote or statement of work (“Proposal”).</P>
        <P>We perform the services with reasonable skill and care, using suitably experienced people.</P>
      </>
    ),
  },
  {
    id: "quotes",
    title: "Quotes, scope and acceptance",
    content: (
      <>
        <Ul>
          <Li>A Proposal is valid for the period stated in it. Work begins once you accept the Proposal in writing (including by email) and any required first payment is made.</Li>
          <Li>The Proposal defines the scope. Anything outside it is a change (see “Changes and extra work”).</Li>
          <Li>Estimates of timing depend on you providing what we need, when we need it.</Li>
        </Ul>
      </>
    ),
  },
  {
    id: "client-duties",
    title: "What we need from you",
    content: (
      <>
        <P>To deliver on time, you agree to:</P>
        <Ul>
          <Li>give us accurate information, content, brand assets and access (for example hosting, domain and analytics) promptly;</Li>
          <Li>nominate a person who can make decisions and give approvals on your behalf;</Li>
          <Li>review work and give consolidated feedback within the agreed time frames;</Li>
          <Li>make sure you have the right to use all content you provide, including text, images, logos, fonts and data.</Li>
        </Ul>
        <P>Delays caused by late feedback, content or access may move delivery dates and, where the delay is long, may affect the price.</P>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and payment",
    content: (
      <>
        <Ul>
          <Li>Fees, currency and payment milestones are stated in the Proposal or invoice. Unless stated otherwise, fees exclude taxes such as VAT or sales tax, which you are responsible for where applicable.</Li>
          <Li>Invoices are due by the date stated on them. We may pause work on, or access to, unpaid projects, and charge reasonable interest or recovery costs on late payments, to the extent the law allows.</Li>
          <Li>Third-party costs such as domains, hosting, software licences, stock assets, plugins and advertising spend are not included unless the Proposal says so.</Li>
          <Li>Fees paid for work already started or completed are not refundable unless the Proposal says otherwise or the law requires it.</Li>
        </Ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes and extra work",
    content: <P>If you ask for something outside the agreed scope, we will tell you the effect on price and timeline and start the extra work only after you approve it in writing. Small corrections within the scope of the original deliverables are included, up to the number of revision rounds stated in the Proposal.</P>,
  },
  {
    id: "acceptance",
    title: "Review, acceptance and launch",
    content: <P>We will let you review deliverables before launch. Unless you report a defect against the agreed scope within the review period stated in the Proposal (or, if none, 7 days of us notifying you), the deliverable is treated as accepted. Launching the work, or using it in production, also counts as acceptance.</P>,
  },
  {
    id: "ip-services",
    title: "Intellectual property in your project",
    content: (
      <>
        <Ul>
          <Li><strong>Your deliverables.</strong> Once we have received full payment, you own the intellectual property rights in the bespoke deliverables we create for you (such as custom designs, copy and code written for your project), subject to the points below.</Li>
          <Li><strong>Our tools and know-how.</strong> We keep ownership of our pre-existing materials, reusable components, frameworks, libraries, templates and general know-how, and give you a perpetual, non-exclusive licence to use them as part of your deliverables.</Li>
          <Li><strong>Third-party and open-source material.</strong> These stay under their own licences, which may carry conditions you must follow.</Li>
          <Li><strong>Your content.</strong> You keep ownership of everything you give us and grant us the right to use it to perform the services.</Li>
          <Li><strong>Portfolio.</strong> Unless we agree otherwise in writing, we may show the finished work, and describe the project, in our portfolio and marketing. Tell us if you want something kept private.</Li>
        </Ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services",
    content: <P>Our work may depend on third-party platforms and services such as hosting providers, payment gateways, APIs, app stores, advertising and analytics platforms. We do not control them and are not responsible for their availability, pricing, policy changes or outages, although we will reasonably help you respond to their effect on your project.</P>,
  },
  {
    id: "support",
    title: "Support, maintenance and defects",
    content: <P>If a deliverable does not work as agreed in the Proposal, tell us in writing and we will fix the defect within a reasonable time, free of charge, during the support period stated in the Proposal. Ongoing maintenance, hosting, monitoring, updates, marketing and SEO retainers are provided only where the Proposal or a separate care plan says so. Defects caused by your changes, third-party tools or misuse are not covered.</P>,
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: <P>Each party will keep the other’s non-public business, technical and financial information confidential, use it only for the project, and share it only with people who need it and are bound to keep it confidential. This does not apply to information that is public through no fault of the recipient, was already known to the recipient, or must be disclosed by law.</P>,
  },
  {
    id: "data-protection",
    title: "Data protection",
    content: <P>Each party will comply with the data protection laws that apply to it. Where we process personal data on your behalf, for example while building or hosting your system, we will do so only on your instructions and under terms that meet legal requirements, which we are happy to sign. How we handle our own personal data is explained in our <Link href="/privacy-policy" className={lnk}>Privacy Policy</Link>.</P>,
  },
  {
    id: "liability",
    title: "Warranties and limits on liability",
    content: (
      <>
        <P>We do not guarantee particular business results, such as search rankings, traffic, leads or sales, because these depend on factors outside our control. Except as stated in these terms or your Proposal, services are provided “as is” and all implied warranties are excluded to the extent the law allows.</P>
        <P>Nothing in these terms limits liability that cannot be limited by law, including liability for fraud, death or personal injury caused by negligence. Subject to that, we are not liable for indirect or consequential loss, or for loss of profit, revenue, data or goodwill, and our total liability for any claim arising from the services is limited to the fees you paid us for the services giving rise to the claim.</P>
      </>
    ),
  },
  {
    id: "termination",
    title: "Ending the work",
    content: (
      <>
        <P>Either party may end a project by written notice if the other materially breaches these terms or the Proposal and does not fix the problem within 14 days of being told. You may also end a project for convenience by written notice, in which case you must pay for work done, commitments made and expenses incurred up to the end date.</P>
        <P>On ending, we will hand over the deliverables paid for, and confidentiality, payment, intellectual property, liability and governing-law provisions continue to apply.</P>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "Events beyond our control",
    content: <P>Neither party is liable for delay or failure caused by events beyond its reasonable control, such as natural disasters, power or internet failures, third-party platform outages, government action, strikes or pandemics, provided it tells the other party promptly and tries to limit the effect.</P>,
  },
  {
    id: "law",
    title: "Governing law and disputes",
    content: <P>These terms and any dispute arising from them are governed by {CO.lawText}. We will first try to resolve any dispute through good-faith discussion. If that fails, the parties submit to the exclusive jurisdiction of {CO.venueText}, except that nothing stops either party from seeking urgent relief elsewhere, or limits mandatory consumer or data protection rights that apply to you.</P>,
  },
  {
    id: "general",
    title: "General",
    content: (
      <Ul>
        <Li>These terms, with the Proposal, are the entire agreement between us on the subject and replace earlier discussions.</Li>
        <Li>If a part of these terms is found unenforceable, the rest still applies.</Li>
        <Li>Not enforcing a right does not waive it. You may not transfer your rights under these terms without our consent.</Li>
        <Li>We may update these terms. The version on our website on the date you accept a Proposal applies to that project, and the current version applies to your use of the website.</Li>
      </Ul>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: <P>Questions about these terms? Email <A href={`mailto:${CO.email}`}>{CO.email}</A> or call <A href={`tel:${CO.phones[0][2]}`}>{CO.phones[0][1]}</A>. Our offices are in {CO.offices}.</P>,
  },
];

export default function Page() {
  return <LegalLayout slug="terms-and-conditions" title="Terms and Conditions" summary="The plain-language rules for using our website and for working with us on a project." sections={sections} />;
}
