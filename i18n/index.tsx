"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import IntlMessageFormat from "intl-messageformat";

type Messages = Record<string, any>;

type I18nContextType = {
  locale: string;
  t: (key: string, values?: Record<string, any>) => string;
  setLocale: (locale: "vi" | "en") => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "app:locale";

function getByPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<"vi" | "en">("vi");
  const [messages, setMessages] = useState<Messages>({});

  // Load persisted locale once
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem(STORAGE_KEY) as "vi" | "en" | null)
        : null;

    if (stored === "vi" || stored === "en") {
      setLocaleState(stored);
    } else {
      // Try detect browser language
      const nav = typeof navigator !== "undefined" ? navigator.language : "vi";
      const detected = nav.toLowerCase().startsWith("vi") ? "vi" : "en";

      setLocaleState(detected);
    }
  }, []);

  // Load messages for current locale
  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data =
          locale === "vi"
            ? await import("../locales/vi.json")
            : await import("../locales/en.json");

        if (!active) return;

        setMessages(data.default || data);
      } catch {
        setMessages({});
      }
    }
    load();

    return () => {
      active = false;
    };
  }, [locale]);

  const setLocale = useCallback((l: "vi" | "en") => {
    setLocaleState(l);

    try {
      localStorage.setItem(STORAGE_KEY, l);
      // also update html lang attribute
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", l);
      }
    } catch {}
  }, []);

  const t = useCallback(
    (key: string, values?: Record<string, any>) => {
      const msg = getByPath(messages, key) ?? key;

      try {
        if (typeof msg === "string") {
          const mf = new IntlMessageFormat(msg, locale);

          return mf.format(values) as string;
        }

        return String(msg);
      } catch {
        return typeof msg === "string" ? msg : key;
      }
    },
    [messages, locale],
  );

  const value = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) throw new Error("useI18n must be used within I18nProvider");

  return ctx;
}
