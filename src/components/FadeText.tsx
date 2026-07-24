import * as React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

type FadeTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div";
};

/**
 * Wraps translated text and replays a subtle fade each time the active
 * language changes. Re-keying on `lang` remounts the inner node so the
 * CSS animation runs fresh on every switch.
 *
 * Uses tw-animate-css utilities: `animate-in fade-in` is the correct
 * combo (NOT `animate-fade-in`, which doesn't exist in this library).
 */
export function FadeText({ children, className, as = "span" }: FadeTextProps) {
  const { lang } = useLanguage();
  const Tag = as;
  return (
    <Tag
      key={lang}
      className={cn(
        "inline-block animate-in fade-in slide-in-from-bottom-1 duration-300 ease-out",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
