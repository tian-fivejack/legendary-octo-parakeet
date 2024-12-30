"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz, Question } from "@/lib/supabase/types";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

interface QuizFormProps {
  initialData?: {
    quiz: Quiz;
    questions: Question[];
  };
  mode: "create" | "edit";
}

export function QuizForm({ initialData, mode }: QuizFormProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].quiz;

  const [title, setTitle] = useState(initialData?.quiz.title || "");
  const [description, setDescription] = useState(
    initialData?.quiz.description || ""
  );
  const [questions, setQuestions] = useState(
    initialData?.questions.map((q) => ({
      question: q.question,
      options: q.options,
      correct_answer: q.correct_answer,
    })) || [
      {
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
      },
    ]
  );
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
      },
    ]);
    setError("");
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length === 1) {
      setError(t.minimumQuestions);
      return;
    }
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    setError("");
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newQuestions = [...questions];
    if (field === "question") {
      newQuestions[index].question = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.replace("option", ""));
      newQuestions[index].options[optionIndex] = value;
    } else if (field === "correct_answer") {
      newQuestions[index].correct_answer = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      mode === "create" ? "/api/quiz" : `/api/quiz/${initialData?.quiz.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        questions,
      }),
    });

    if (response.ok) {
      router.push("/my-quizzes");
      router.refresh();
    }
  };

  return (
    <Card dir={language === "ar" ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>{mode === "create" ? t.createQuiz : t.editQuiz}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Input
              placeholder={t.quizTitle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={cn(language === "ar" && "text-right")}
            />
            <Textarea
              placeholder={t.quizDescription}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(language === "ar" && "text-right")}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {questions.map((q, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <Input
                placeholder={t.questionPlaceholder}
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                required
                className={cn(language === "ar" && "text-right")}
              />
              {q.options.map((option, optionIndex) => (
                <Input
                  key={optionIndex}
                  placeholder={`${t.option} ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      `option${optionIndex}`,
                      e.target.value
                    )
                  }
                  required
                  className={cn(language === "ar" && "text-right")}
                />
              ))}
              <Input
                placeholder={t.correctAnswer}
                value={q.correct_answer}
                onChange={(e) =>
                  handleQuestionChange(index, "correct_answer", e.target.value)
                }
                required
                className={cn(language === "ar" && "text-right")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDeleteQuestion(index)}
                className="w-full"
              >
                {t.deleteQuestion}
              </Button>
            </div>
          ))}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleAddQuestion}>
              {t.addQuestion}
            </Button>
          </div>

          <Button type="submit" className="w-full">
            {mode === "create" ? t.create : t.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
