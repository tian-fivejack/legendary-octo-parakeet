"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateQuiz() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
      },
    ]);
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

    const response = await fetch("/api/quiz", {
      method: "POST",
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
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <Input
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {questions.map((q, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <Input
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  required
                />
                {q.options.map((option, optionIndex) => (
                  <Input
                    key={optionIndex}
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        `option${optionIndex}`,
                        e.target.value
                      )
                    }
                    required
                  />
                ))}
                <Input
                  placeholder="Correct Answer"
                  value={q.correct_answer}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "correct_answer",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            ))}

            <Button type="button" variant="outline" onClick={handleAddQuestion}>
              Add Question
            </Button>

            <Button type="submit" className="w-full">
              Create Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
