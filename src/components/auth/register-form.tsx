"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthForm } from "./auth-form";
import { apiFetch } from "@/lib/api-fetch";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const supabase = createClientComponentClient();

  // const handleRegister = async (email: string, password: string) => {
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         emailRedirectTo: `${location.origin}/auth/callback`,
  //       },
  //     });

  //     if (error) {
  //       setError(error.message);
  //       return;
  //     }

  //     router.push("/login");
  //   } catch (e) {
  //     console.error(e);
  //     setError("An error occurred during registration");
  //   }
  // };

  const handleRegister = async (email: string, password: string) => {
    try {
      const data = await apiFetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      console.log(data);
      setError(data.message);

      router.push("/");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError(e.message);
      }
    }
  };

  return <AuthForm onSubmit={handleRegister} error={error} mode="register" />;
}
