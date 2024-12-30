"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import { apiFetch } from "@/lib/api-fetch";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      router.push("/");
      router.refresh();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        setError(e.message);
      }
    }
  };

  return <AuthForm onSubmit={handleLogin} error={error} mode="login" />;
}
