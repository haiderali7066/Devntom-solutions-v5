/**
 * Creates (or resets) the admin account. Run once:
 *   npx tsx --env-file=.env.local scripts/create-admin.ts
 * Needs ADMIN_EMAIL and ADMIN_PASSWORD in the environment. Remove them afterwards.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("ADMIN_EMAIL is missing or invalid");
  if (!password || password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters with upper case, lower case and a number");
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  const passwordHash = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    { email, passwordHash, role: "admin", failedAttempts: 0, lockUntil: null },
    { upsert: true, setDefaultsOnInsert: true },
  );
  console.log(`Admin ready: ${email}`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
