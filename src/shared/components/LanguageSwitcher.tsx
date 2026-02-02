import { useLanguage } from "@/shared/i18n/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  variant?: "icon" | "text" | "full";
  className?: string;
}

const LanguageSwitcher = ({ variant = "icon", className = "" }: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "en" as const, label: t.language.en, flag: "🇺🇸" },
    { code: "id" as const, label: t.language.id, flag: "🇮🇩" },
  ];

  const currentLang = languages.find((l) => l.code === language);

  if (variant === "text") {
    return (
      <button
        onClick={() => setLanguage(language === "en" ? "id" : "en")}
        className={`text-sm font-sans tracking-wide hover:opacity-70 transition-opacity ${className}`}
        aria-label={t.language.switchTo}
      >
        {language === "en" ? "ID" : "EN"}
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`p-2 hover:opacity-70 transition-opacity flex items-center gap-2 ${className}`}
        aria-label={t.language.switchTo}
      >
        <Globe className="h-5 w-5" />
        {variant === "full" && (
          <span className="text-sm font-sans">{currentLang?.label}</span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? "bg-muted" : ""}`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

