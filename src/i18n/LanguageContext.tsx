import * as React from "react";
import { translations, LANGUAGES, type Lang, type TranslationKeys } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationKeys;
  languages: typeof LANGUAGES;
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "skystrike.lang";

function isLang(value: string | null): value is Lang {
  return !!value && translations[value as Lang] !== undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  // Hydrate from localStorage on client mount (SSR-safe)
  React.useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (isLang(stored)) setLangState(stored);
    } catch {
      // ignore
    }
  }, []);

  // Reflect language on <html lang> for font selectors (:lang(zh), :lang(ja))
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang], languages: LANGUAGES }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
