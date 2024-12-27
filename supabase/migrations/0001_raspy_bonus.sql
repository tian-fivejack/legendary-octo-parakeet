/*
  # Quiz Application Schema

  1. New Tables
    - `quizzes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
      
    - `questions`
      - `id` (uuid, primary key)
      - `quiz_id` (uuid, references quizzes)
      - `question` (text)
      - `options` (jsonb array of options)
      - `correct_answer` (text)
      
    - `quiz_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `quiz_id` (uuid, references quizzes)
      - `score` (integer)
      - `time_taken` (integer, in seconds)
      - `completed_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  quiz_id uuid REFERENCES quizzes ON DELETE CASCADE NOT NULL,
  score integer NOT NULL,
  time_taken integer NOT NULL,
  completed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policies for quizzes
CREATE POLICY "Users can view all quizzes"
  ON quizzes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create quizzes"
  ON quizzes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policies for questions
CREATE POLICY "Users can view questions for accessible quizzes"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for quiz attempts
CREATE POLICY "Users can view their own attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts"
  ON quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);