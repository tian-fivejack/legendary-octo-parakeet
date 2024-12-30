"use client";

import { LanguageContext } from "@/hooks/use-language";
import { ReactNode, useState } from "react";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "ar">(() => {
    return (
      ((typeof window !== "undefined" && localStorage.getItem("language")) as
        | "en"
        | "ar") || "en"
    );
  });

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
