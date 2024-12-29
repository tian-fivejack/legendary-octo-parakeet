"use client";

import { createContext, useContext } from "react";

interface LanguageContextProps {
  language: "en" | "ar";
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
