"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthForm } from "./auth-form";
import { apiFetch } from "@/lib/api-fetch";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const supabase = createClientComponentClient();

  // const handleLogin = async (email: string, password: string) => {
  //   try {
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       setError(error.message);
  //       return;
  //     }

  //     router.push("/");
  //     router.refresh();
  //   } catch (e) {
  //     console.error(e);
  //     setError("An error occurred during login");
  //   }
  // };

  const handleLogin = async (email: string, password: string) => {
    try {
      // const data = await apiFetch("/api/login", {
      await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      // console.log(data);

      router.push("/");
      router.refresh();
      // Handle successful login (e.g., redirect or update UI)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        setError(e.message);
      }
    }
  };

  return <AuthForm onSubmit={handleLogin} error={error} mode="login" />;
}
