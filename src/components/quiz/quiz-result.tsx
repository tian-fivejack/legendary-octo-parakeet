"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import { AttemptComponent } from "./attemp-list";

interface QuizResultsProps {
  score: string;
  total: string;
  quizId: string;
}

export function QuizResults({ score, total, quizId }: QuizResultsProps) {
  const { language } = useLanguage();
  const t = translations[language].results;

  return (
    <div className="container mx-auto py-8">
      <Card
        className="max-w-2xl mx-auto"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <CardHeader>
          <CardTitle>{t.quizResults}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                {t.yourScore}: {score}/{total}
              </h2>
              <p className="text-muted-foreground">
                {Math.round((parseInt(score) / parseInt(total)) * 100)}%
              </p>
            </div>
            <AttemptComponent quiz_id={quizId} />
            <div
              className={cn(
                "flex justify-center gap-4",
                language === "ar" && "flex-row-reverse"
              )}
            >
              <Button asChild>
                <Link href="/">{t.backHome}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/quiz/${quizId}`}>{t.tryAgain}</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
