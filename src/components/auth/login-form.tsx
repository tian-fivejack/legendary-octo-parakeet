"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import { apiFetch } from "@/lib/api-fetch";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { language } = useLanguage();
  const t = translations[language].auth;

  const handleLogin = async (email: string, password: string) => {
    try {
      await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      router.push("/");
      router.refresh();
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    }
  };

  return (
    <div className="max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-8">{t.login}</h1>
      <AuthForm onSubmit={handleLogin} error={error} mode="login" />
    </div>
  );
}
