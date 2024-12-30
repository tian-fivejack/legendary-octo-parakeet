"use client";

import { Quiz } from "@/lib/supabase/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface UserQuizzesProps {
  quizzes: Quiz[];
}

export function UserQuizzes({ quizzes }: UserQuizzesProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("quizzes").delete().eq("id", id);

    if (!error) {
      router.refresh();
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="relative group">
          <CardHeader>
            <CardTitle className="pr-16">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
            <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/quiz/${quiz.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(quiz.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
