"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import { apiFetch } from "@/lib/api-fetch";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    try {
      const data = await apiFetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setError(data.message);

      router.push("/");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError(e.message);
      }
    }
  };

  return (
    <div className="max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
      <AuthForm onSubmit={handleRegister} error={error} mode="register" />;
    </div>
  );
}
