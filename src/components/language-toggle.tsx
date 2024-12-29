"use client";

import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="fixed top-4 right-4 rtl:left-4 rtl:right-auto"
    >
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
}
