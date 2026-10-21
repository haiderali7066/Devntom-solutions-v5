
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import {
  FaArrowUpRightFromSquare,
  FaRightFromBracket,
} from "react-icons/fa6";
import { auth } from "@/auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#F5F9FF]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-[#E2ECFA]" />
      </div>
    </div>
  );
}

async function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  // Run request-specific authentication after entering the Suspense boundary.
  await connection();

  const session = await auth();
  const signedIn = session?.user?.role === "admin";

  return (
    <div className="min-h-screen bg-[#F5F9FF] text-[#0B1F3B]">
      {signedIn && (
        <header className="sticky top-0 z-40 border-b border-[#CFE2FF] bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 font-semibold"
            >
              <svg
                height="24"
                width="29"
                viewBox="160 267 913 753"
                aria-hidden="true"
              >
                <path
                  fill="#007BFF"
                  fillRule="evenodd"
                  d="M274 267H700C906 267 1073 437 1073 648C1073 853 919 1020 730 1020H160L433 551ZM543 433H680C792 433 883 528 883 645C883 762 792 858 680 858H447L628 555Z"
                />
              </svg>
              Blog admin
            </Link>

            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/admin/posts/new"
                className="rounded-full bg-[#007BFF] px-4 py-2 font-medium text-white transition hover:bg-[#0052CC]"
              >
                New post
              </Link>

              <a
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-[#475569] transition hover:bg-[#EAF2FF] sm:inline-flex"
              >
                View blog
                <FaArrowUpRightFromSquare
                  size={11}
                  aria-hidden="true"
                />
              </a>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[#475569] transition hover:bg-[#EAF2FF]"
                >
                  <FaRightFromBracket size={13} aria-hidden="true" />
                  Log out
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}