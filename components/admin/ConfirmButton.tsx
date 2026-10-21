"use client";

import type { ReactNode } from "react";

/** A submit button that asks for confirmation first. Use inside a server-action form. */
export default function ConfirmButton({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  return (
    <button type="submit" className={className} onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}>
      {children}
    </button>
  );
}
