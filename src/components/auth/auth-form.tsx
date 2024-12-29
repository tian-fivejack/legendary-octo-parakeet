"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
  mode: "login" | "register";
}

export function AuthForm({ onSubmit, error, mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { language } = useLanguage();
  const t = translations[language].auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <div
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t.email}
          </label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn("mt-1", language === "ar" && "text-right")}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {t.password}
          </label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn("mt-1", language === "ar" && "text-right")}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          {mode === "login" ? t.login : t.register}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <>
            {t.dontHaveAccount}{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500"
            >
              {t.signUp}
            </Link>
          </>
        ) : (
          <>
            {t.alreadyHaveAccount}{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              {t.signIn}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
