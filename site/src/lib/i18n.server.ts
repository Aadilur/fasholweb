import { cookies } from "next/headers";
import { LANG_COOKIE, type Lang } from "@/lib/i18n";

/** Read the active language from the cookie (server components / route handlers). */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get(LANG_COOKIE)?.value === "bn" ? "bn" : "en";
}
