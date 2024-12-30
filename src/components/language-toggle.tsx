"use client";

import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button onClick={toggleLanguage} variant="outline">
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
}
