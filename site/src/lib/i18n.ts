export type Lang = "en" | "bn";

export const LANG_COOKIE = "lang";

/** Pick the string for the active language. Client- and server-safe. */
export function t(lang: Lang, en: string, bn: string): string {
  return lang === "bn" ? bn : en;
}
