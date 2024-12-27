"use client";

import { useState, useEffect } from "react";
import { Quiz, Question } from "@/src/lib/supabase/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";

export function QuizComponent({
  quiz,
  questions,
}: {
  quiz: Quiz;
  questions: Question[];
}) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }
  }, [timeLeft, isFinished]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion === questions.length - 1) {
      handleFinish();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleFinish = async () => {
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

    router.push(
      `/quiz/${quiz.id}/results?score=${score}&total=${questions.length}`
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isFinished) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-4">
            Your score: {score} out of {questions.length}
          </p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle>{quiz.title}</CardTitle>
          <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
        </div>
        <Progress
          value={(currentQuestion + 1) * (100 / questions.length)}
          className="mb-4"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="grid gap-2">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? "default" : "outline"}
                className="w-full text-left justify-start"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="w-full mt-4"
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
