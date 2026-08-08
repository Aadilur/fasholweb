"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, LANG_COOKIE } from "@/lib/i18n";

const LangContext = createContext<Lang>("en");

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]*)`)
    );
    if (match?.[1] === "bn") setLang("bn");
  }, []);

  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}
