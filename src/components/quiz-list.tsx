"use client";

import { Quiz } from "@/lib/supabase/types";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import Link from "next/link";
import { useInitData } from "@/hooks/use-init-data";

export function QuizList() {
  const { data: quizzes } = useInitData<Quiz[]>("/api/quiz", {});

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes?.map((quiz) => (
        <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
