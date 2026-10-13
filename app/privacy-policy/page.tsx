import type { Metadata } from "next";
import LegalLayout, { A, CO, H3, Li, P, Table, Ul, BASE, type LegalSection } from "@/components/LegalLayout";
import Link from "next/link";

const TITLE = "Privacy Policy | DEVNTOM Solutions";
const DESC = "How DEVNTOM Solutions collects, uses, shares and protects personal data, and the rights you have over it.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${BASE}/privacy-policy`, siteName: CO.name, title: TITLE, description: DESC },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <P>{CO.name} (“we”, “us”, “our”) is a technology company building websites, custom software, mobile apps, AI automation, digital marketing, UI/UX design and SEO for clients worldwide. We have offices in {CO.offices}.</P>
        <P>This policy explains how we handle personal data when you visit <strong>{CO.site}</strong>, contact us, or work with us. For the purposes of data protection law, we are the “controller” of the personal data described here, unless we say otherwise (for example, when we process data on a client’s behalf while building or running their system).</P>
        <P>You can reach us at <A href={`mailto:${CO.email}`}>{CO.email}</A> for anything related to this policy.</P>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Information we collect",
    content: (
      <>
        <H3>Information you give us</H3>
        <Ul>
          <Li>Contact details: your name, email address, phone or WhatsApp number, company and job title.</Li>
          <Li>Project details you share in our contact form, by email, on a call or on WhatsApp, such as goals, features, timeline, budget range and links to references.</Li>
          <Li>Business and billing details needed to prepare proposals, sign agreements and issue invoices.</Li>
          <Li>The content of our correspondence, and any files you send us.</Li>
        </Ul>
        <H3>Information collected automatically</H3>
        <P>When you use our website, we and our service providers may collect technical data such as your IP address, browser and device type, operating system, pages viewed, referring website, approximate location and the date and time of your visit. This is collected using cookies and similar technologies. See our <Link href="/cookie-policy" className="font-medium text-[#0052CC] underline decoration-[#93C5FD] underline-offset-4">Cookie Policy</Link> for details and choices.</P>
        <H3>Information from other sources</H3>
        <P>We may receive business contact details from publicly available sources, from referrals, or from professional networks, and we use them only to start a relevant business conversation.</P>
        <P>We do not ask for sensitive personal data (such as health, biometric or religious information) and ask that you do not send it to us.</P>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    content: (
      <>
        <Ul>
          <Li>To reply to your enquiries and prepare proposals, quotes and project plans.</Li>
          <Li>To enter into and perform contracts, deliver services, provide support and take payment.</Li>
          <Li>To communicate with you about your project, including updates and important notices.</Li>
          <Li>To operate, secure and improve our website, services and processes.</Li>
          <Li>To detect and prevent fraud, abuse and security incidents.</Li>
          <Li>To meet legal, tax and accounting obligations and to establish or defend legal claims.</Li>
          <Li>To send you news or offers about our services, where the law allows or where you have agreed. You can opt out at any time.</Li>
        </Ul>
        <P>We do not sell your personal data, and we do not use it for automated decisions that have legal or similarly significant effects on you.</P>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    content: (
      <>
        <P>Where the UK GDPR or EU GDPR applies to you, we rely on the following legal bases:</P>
        <Table
          head={["Purpose", "Legal basis"]}
          rows={[
            ["Responding to enquiries, preparing quotes, delivering services", "Contract, or steps taken at your request before entering a contract"],
            ["Running and improving our website and business, security, direct business-to-business contact", "Legitimate interests (our interest in running a secure, effective business, balanced against your rights)"],
            ["Non-essential cookies and some marketing messages", "Consent, which you can withdraw at any time"],
            ["Tax, accounting and other legal duties", "Legal obligation"],
          ]}
        />
        <P>Where Saudi Arabia’s Personal Data Protection Law or another local law applies, we process personal data in line with the requirements of that law, including by relying on consent or another lawful basis it recognises.</P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <P>We share personal data only where needed and only with:</P>
        <Ul>
          <Li><strong>Service providers</strong> that help us run the business, such as website hosting and infrastructure, email and communication tools (including messaging apps like WhatsApp), form handling, analytics, cloud storage, project management and accounting tools. They may only use the data to provide their service to us.</Li>
          <Li><strong>Professional advisers</strong> such as lawyers, accountants and insurers.</Li>
          <Li><strong>Authorities</strong> where we are legally required to, or to protect our rights, our clients or others.</Li>
          <Li><strong>A successor business</strong> if we are involved in a merger, acquisition or sale of assets, in which case this policy will continue to apply to your data unless you are told otherwise.</Li>
        </Ul>
        <P>Our team members in our different offices may access personal data where they need to for the purposes above.</P>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    content: (
      <>
        <P>We operate from Pakistan, Saudi Arabia and the United Kingdom and work with clients and providers around the world, so your data may be processed in countries other than your own, including countries that do not have the same data protection laws as yours.</P>
        <P>When we transfer personal data out of the UK or European Economic Area, we use a lawful transfer mechanism such as an adequacy decision, standard contractual clauses or the UK International Data Transfer Agreement, together with appropriate safeguards. Contact us if you would like more information.</P>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <>
        <P>We keep personal data only for as long as we need it for the purposes in this policy. In practice this means:</P>
        <Ul>
          <Li>Enquiries that do not lead to a project: for as long as needed to respond and for a reasonable period afterwards in case you come back to us.</Li>
          <Li>Client and project records: for the length of the relationship and afterwards for as long as needed to support the work we delivered and to meet legal, tax and accounting requirements.</Li>
          <Li>Website analytics and cookie data: for the periods described in our Cookie Policy.</Li>
        </Ul>
        <P>When we no longer need personal data, we delete or anonymise it.</P>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <P>We use appropriate technical and organisational measures to protect personal data, including encrypted connections (HTTPS), access controls, and careful selection of providers. No system is completely secure, so we cannot guarantee absolute security, but if a breach affects your rights we will notify you and the relevant authority where the law requires.</P>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <P>Depending on where you live, you may have the right to:</P>
        <Ul>
          <Li>be told about, and ask for a copy of, the personal data we hold about you;</Li>
          <Li>have inaccurate data corrected and incomplete data completed;</Li>
          <Li>ask us to delete your data, or restrict how we use it;</Li>
          <Li>object to processing based on our legitimate interests, and to direct marketing at any time;</Li>
          <Li>receive your data in a portable format, where it is processed by automated means under contract or consent;</Li>
          <Li>withdraw your consent at any time, without affecting earlier processing.</Li>
        </Ul>
        <P>To use any of these rights, email <A href={`mailto:${CO.email}`}>{CO.email}</A>. We may need to verify your identity first, and we will respond within the time required by the law that applies to you. If you are not happy with our response, you can complain to your local data protection authority, for example the UK Information Commissioner’s Office (<A href="https://ico.org.uk">ico.org.uk</A>), your EU supervisory authority, or the Saudi Data and AI Authority (SDAIA). We would appreciate the chance to put things right first.</P>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing messages",
    content: <P>If you have asked to hear from us, or the law otherwise allows us to contact you about our services, you can opt out at any time by using the unsubscribe link in a message, replying “stop”, or emailing us. We will still send you messages that are necessary for a project you have with us.</P>,
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    content: <P>We use cookies and similar technologies on our website. Our <Link href="/cookie-policy" className="font-medium text-[#0052CC] underline decoration-[#93C5FD] underline-offset-4">Cookie Policy</Link> explains what they are, which ones we use and how to manage them.</P>,
  },
  {
    id: "children",
    title: "Children",
    content: <P>Our website and services are for businesses and are not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has given us personal data, contact us and we will delete it.</P>,
  },
  {
    id: "links",
    title: "Links to other websites",
    content: <P>Our website may link to third-party websites and social platforms. We are not responsible for their privacy practices, so please read their policies before sharing personal data with them.</P>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: <P>We may update this policy from time to time. The “last updated” date at the top shows when it last changed. If we make a significant change, we will take reasonable steps to let you know, for example by a notice on our website.</P>,
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <P>{CO.name}</P>
        <Ul>
          <Li>Email: <A href={`mailto:${CO.email}`}>{CO.email}</A></Li>
          {CO.phones.map(([c, label, tel]) => <Li key={c}>{c}: <A href={`tel:${tel}`}>{label}</A></Li>)}
          <Li>Offices: {CO.offices}</Li>
        </Ul>
      </>
    ),
  },
];

export default function Page() {
  return <LegalLayout slug="privacy-policy" title="Privacy Policy" summary="We collect only what we need to answer you and do the work, we never sell your data, and you stay in control of it." sections={sections} />;
}