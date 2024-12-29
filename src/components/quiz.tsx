"use client";

import { useState, useEffect, useCallback } from "react";
import { Quiz } from "@/lib/supabase/types";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

export function QuizComponent({ quiz }: { quiz: Quiz }) {
  const { push } = useRouter();
  const { language } = useLanguage();
  const t = translations[language].quiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isFinished, setIsFinished] = useState(false);

  const questions = quiz.questions;
  const isCorrect =
    selectedAnswer === questions[currentQuestion].correct_answer;

  const handleFinish = useCallback(async () => {
    setIsFinished(true);
    const timeTaken = 300 - timeLeft;

    await fetch(`/api/quiz/${quiz.id}/attempt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score,
        time_taken: timeTaken,
      }),
    });

    push(`/quiz/${quiz.id}/results?score=${score}&total=${questions.length}`);
  }, [push, questions.length, quiz.id, score, timeLeft]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }
  }, [timeLeft, isFinished, handleFinish]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleCheck = () => {
    setIsChecked(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      handleFinish();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsChecked(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isFinished) {
    return (
      <div
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <h2 className="text-2xl font-bold mb-4">{t.score}</h2>
        <p className="text-2xl mb-4">
          {score} {t.outOf} {questions.length}
        </p>
        <Button onClick={() => push("/")}>{t.backHome}</Button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div
        className="max-w-3xl mx-auto bg-gray-700 rounded-lg shadow-md h-[600px] flex flex-col"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="flex items-center gap-2">
              <span>{t.timeLeft}:</span>
              <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress
            value={(currentQuestion + 1) * (100 / questions.length)}
            className="mb-2"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid gap-2">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                variant={
                  isChecked
                    ? option === questions[currentQuestion].correct_answer
                      ? "default"
                      : option === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : selectedAnswer === option
                    ? "default"
                    : "outline"
                }
                className={cn(
                  "w-full text-left justify-start",
                  language === "ar" && "text-right justify-end"
                )}
                onClick={() => handleAnswer(option)}
                disabled={isChecked}
              >
                {option}
              </Button>
            ))}
          </div>

          {isChecked && (
            <div
              className={cn(
                "p-4 rounded-md mt-4",
                isCorrect
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              )}
            >
              {isCorrect ? (
                t.correct
              ) : (
                <p>
                  {t.incorrect} {questions[currentQuestion].correct_answer}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <Button
            onClick={isChecked ? handleNext : handleCheck}
            disabled={!selectedAnswer}
            className="w-full"
          >
            {isChecked
              ? currentQuestion === questions.length - 1
                ? t.finish
                : t.next
              : t.check}
          </Button>
        </div>
      </div>
    </div>
  );
}
