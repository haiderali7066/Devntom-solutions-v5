import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

const SITE = "https://www.devntomsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),

  title: {
    default:
      "Devntom Solutions | Website, Software, Mobile App and AI Automation Company",
    template: "%s | Devntom Solutions",
  },

  description:
    "Devntom Solutions engineers websites, custom software, mobile apps, AI automation, UI/UX design, digital marketing and SEO for businesses in Pakistan, Saudi Arabia, the UK and worldwide.",

  applicationName: "Devntom Solutions",

  keywords: [
    "website development company",
    "custom software development",
    "mobile app development",
    "AI automation",
    "UI/UX design",
    "digital marketing",
    "SEO services",
    "software company Lahore",
    "software company Riyadh",
    "software company London",
  ],

  authors: [
    {
      name: "Devntom Solutions",
      url: SITE,
    },
  ],

  creator: "Devntom Solutions",
  publisher: "Devntom Solutions",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "Devntom Solutions",
    locale: "en_US",
    url: SITE,

    title: "Devntom Solutions | Where Systems Become Strategy",

    description:
      "Websites, custom software, mobile apps and AI automation, engineered as one connected system.",

    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Devntom Solutions | Where Systems Become Strategy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Devntom Solutions | Where Systems Become Strategy",

    description:
      "Websites, custom software, mobile apps and AI automation, engineered as one connected system.",

    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050E1F",
  colorScheme: "light",
};

const orgLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,

      name: "Devntom Solutions",
      alternateName: "DEVNTOM Solutions",

      url: SITE,
      logo: `${SITE}/logo.png`,

      slogan: "Where Systems Become Strategy",

      description:
        "Devntom Solutions engineers websites, custom software, mobile apps, AI automation, UI/UX design, digital marketing and SEO for businesses worldwide.",

      email: "info@devntomsolutions.com",

      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+92-325-6036838",
          contactType: "customer service",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },

        {
          "@type": "ContactPoint",
          telephone: "+966-583-408034",
          contactType: "customer service",
          areaServed: "SA",
          availableLanguage: ["English", "Arabic"],
        },
      ],

      location: [
        {
          "@type": "Place",
          name: "Lahore office",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lahore",
            addressCountry: "PK",
          },
        },

        {
          "@type": "Place",
          name: "Riyadh office",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Riyadh",
            addressCountry: "SA",
          },
        },

        {
          "@type": "Place",
          name: "London office",
          address: {
            "@type": "PostalAddress",
            addressLocality: "London",
            addressCountry: "GB",
          },
        },
      ],

      sameAs: [
        "https://www.instagram.com/devntom.solutions",
        "https://www.facebook.com/share/18ANCC7uwH/",
        "https://www.linkedin.com/in/devntom-solutions-6b15293b5",
        "https://www.pinterest.com/devntomsolutions",
        "https://x.com/DevntomS18433",
        "https://medium.com/@devntomsolutions",
        "https://stackoverflow.com/users/32455629/devntom-solutions",
        "https://www.reddit.com/user/Civil_Woodpecker7536/",
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Devntom Solutions",

      publisher: {
        "@id": `${SITE}/#organization`,
      },

      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgLd),
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:bg-white focus:px-4 focus:py-2 focus:text-[#0B1F3B]"
        >
          Skip to content
        </a>

          <Navbar />

          {children}

          <Footer showCta={false} />
      </body>
    </html>
  );
}