import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, languages } = useLanguage();
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={cn(
            "lang-btn rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-opacity",
            lang === l.code
              ? "bg-primary/20 text-primary opacity-100"
              : "text-white/70 opacity-50 hover:opacity-100",
          )}
          aria-pressed={lang === l.code}
          aria-label={`Switch language to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
