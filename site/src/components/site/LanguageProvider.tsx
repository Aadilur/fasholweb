"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>("en");

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Active language inside client components. */
export function useLang(): Lang {
  return useContext(LangContext);
}
