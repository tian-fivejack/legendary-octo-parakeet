"use client";

import { QuizList } from "@/components/quiz-list";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    <div
      className="container mx-auto py-8"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div
        className={cn(
          "flex justify-between items-center mb-8",
          language === "ar" && "flex-row-reverse"
        )}
      >
        <h1 className="text-4xl font-bold">{t.availableQuizzes}</h1>
        <Button asChild>
          <Link href="/quiz/create">{t.createQuiz}</Link>
        </Button>
      </div>
      <QuizList />
    </div>
  );
}
