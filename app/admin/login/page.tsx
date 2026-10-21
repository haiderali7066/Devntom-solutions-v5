"use client";

import { useActionState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { loginAction, type LoginState } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  const input = "mt-1.5 w-full rounded-[12px] border border-[#CFE2FF] bg-white px-4 py-3 outline-none transition focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/30";

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <div className="rounded-[22px] border border-[#CFE2FF] bg-white p-8 shadow-[0_30px_80px_rgba(0,82,204,.12)]">
        <svg height="30" width="36" viewBox="160 267 913 753" aria-hidden="true"><path fill="#007BFF" fillRule="evenodd" d="M274 267H700C906 267 1073 437 1073 648C1073 853 919 1020 730 1020H160L433 551ZM543 433H680C792 433 883 528 883 645C883 762 792 858 680 858H447L628 555Z" /></svg>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-1 text-sm text-[#64748B]">Devntom Solutions blog</p>
        <form action={action} className="mt-7 space-y-4" noValidate>
          <label className="block text-sm font-medium">Email<input name="email" type="email" autoComplete="username" required className={input} /></label>
          <label className="block text-sm font-medium">Password<input name="password" type="password" autoComplete="current-password" required className={input} /></label>
          {state.error && <p role="alert" className="flex items-start gap-2 rounded-[10px] bg-[#FEF2F2] p-3 text-sm text-[#B91C1C]"><FaTriangleExclamation className="mt-0.5 shrink-0" aria-hidden="true" />{state.error}</p>}
          <button disabled={pending} className="w-full rounded-full bg-[#0B1F3B] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#007BFF] disabled:opacity-60">{pending ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}
