"use client";

import { UserQuizzes } from "@/components/quiz/user-quizzes";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MyQuizzesPage() {
  const { language } = useLanguage();
  const t = translations[language].quiz;

  return (
    <div className="container mx-auto py-8">
      <div
        className={cn(
          "flex justify-between items-center mb-8",
          language === "ar" && "flex-row-reverse"
        )}
      >
        <h1 className="text-4xl font-bold">{t.myQuizzes}</h1>
        <Button asChild>
          <Link href="/quiz/create">{t.createQuiz}</Link>
        </Button>
      </div>
      <UserQuizzes />
    </div>
  );
}
