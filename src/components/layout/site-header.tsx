"use client";

import { LanguageToggle } from "../language-toggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { apiFetch } from "@/lib/api-fetch";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { language } = useLanguage();
  const router = useRouter();
  const t = translations[language].siteHeader;

  const handleLogout = async () => {
    try {
      await apiFetch("/api/logout", {
        method: "POST",
      });

      router.push("/");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        language === "ar" && "rtl"
      )}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className=" flex h-14 items-center justify-between px-4">
        <nav className="flex items-center gap-4">
          <Link href="/" className="font-semibold">
            {t.home}
          </Link>
          <Link href="/my-quizzes" className="font-semibold">
            {t.myQuizzes}
          </Link>
        </nav>
        <div
          className={cn(
            "flex items-center gap-4",
            language === "ar" && "flex-row-reverse"
          )}
        >
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title={t.logout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
