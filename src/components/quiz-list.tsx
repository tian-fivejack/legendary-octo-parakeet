"use client";

import { Quiz } from "@/src/lib/supabase/types";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import Link from "next/link";

export function QuizList({ quizzes }: { quizzes: Quiz[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
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
