"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import { apiFetch } from "@/lib/api-fetch";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].auth;

  const handleRegister = async (email: string, password: string) => {
    try {
      const data = await apiFetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setError(data.message);

      router.push("/");
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    }
  };

  return (
    <div className="max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-8">{t.createAccount}</h1>
      <AuthForm onSubmit={handleRegister} error={error} mode="register" />
    </div>
  );
}
