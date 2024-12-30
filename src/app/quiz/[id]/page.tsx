"use client";

import { QuizComponent } from "@/components/quiz";
import { useInitData } from "@/hooks/use-init-data";
import { Quiz } from "@/lib/supabase/types";
import { Fragment } from "react";

export default function QuizPage({ params }: { params: { id: string } }) {
  const { data: quiz } = useInitData<Quiz>(`/api/quiz/${params.id || 0}`);

  if (!quiz) return <Fragment />;

  return (
    <div className="container mx-auto py-8">
      <QuizComponent quiz={quiz} />
    </div>
  );
}
