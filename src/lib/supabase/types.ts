export type Quiz = {
  id: string;
  title: string;
  description: string | null;
  created_by: string;
  created_at: string;
  questions: Question[];
};

export type Question = {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_answer: string;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  time_taken: number;
  completed_at: string;
};
