import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

const credentialsSchema = z.object({ email: z.string().trim().toLowerCase().email().max(120), password: z.string().min(8).max(200) });

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
// Compared against when the email is unknown, so response time does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 8, updateAge: 60 * 30 }, // 8 hour sessions
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        await connectDB();
        const user = await User.findOne({ email }).select("+passwordHash");

        if (user?.lockUntil && user.lockUntil > new Date()) return null; // temporarily locked

        const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !ok) {
          if (user) {
            const attempts = (user.failedAttempts ?? 0) + 1;
            await User.updateOne({ _id: user._id }, { failedAttempts: attempts >= MAX_ATTEMPTS ? 0 : attempts, lockUntil: attempts >= MAX_ATTEMPTS ? new Date(Date.now() + LOCK_MINUTES * 60_000) : null });
          }
          return null;
        }

        await User.updateOne({ _id: user._id }, { failedAttempts: 0, lockUntil: null, lastLoginAt: new Date() });
        return { id: String(user._id), email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = user.role; }
      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id ?? "");
      session.user.role = String(token.role ?? "");
      return session;
    },
  },
});

/**
 * Call this at the top of EVERY admin page, server action and API route.
 * Middleware only redirects; this is the check that actually protects data.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/admin/login");
  return session.user;
}

declare module "next-auth" {
  interface User { role?: string }
  interface Session { user: { id: string; role: string } & DefaultSession["user"] }
}
declare module "next-auth/jwt" {
  interface JWT { id?: string; role?: string }
}
