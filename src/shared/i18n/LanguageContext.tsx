import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { en, Translations } from "./translations/en";
import { id } from "./translations/id";

export type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  switchLanguage: () => void;
}

const translations: Record<Language, Translations> = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract language from URL path
  const getLanguageFromPath = (): Language => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const firstSegment = pathSegments[0];
    if (firstSegment === "en" || firstSegment === "id") {
      return firstSegment;
    }
    // Default to English if no language prefix
    return "en";
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);

  // Update language when URL changes
  useEffect(() => {
    const langFromPath = getLanguageFromPath();
    if (langFromPath !== language) {
      setLanguageState(langFromPath);
    }
  }, [location.pathname]);

  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;
    
    // Get current path without language prefix
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentLangPrefix = pathSegments[0];
    
    let newPath: string;
    if (currentLangPrefix === "en" || currentLangPrefix === "id") {
      // Replace existing language prefix
      pathSegments[0] = newLang;
      newPath = "/" + pathSegments.join("/");
    } else {
      // Add language prefix
      newPath = `/${newLang}${location.pathname}`;
    }
    
    // Preserve search params
    const searchParams = location.search;
    navigate(newPath + searchParams, { replace: true });
    setLanguageState(newLang);
  };

  const switchLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Utility hook to get localized path
export const useLocalizedPath = () => {
  const { language } = useLanguage();
  
  return (path: string): string => {
    // If path already has language prefix, return as is
    if (path.startsWith("/en/") || path.startsWith("/id/") || path === "/en" || path === "/id") {
      return path;
    }
    // Add language prefix
    return `/${language}${path.startsWith("/") ? path : "/" + path}`;
  };
};
