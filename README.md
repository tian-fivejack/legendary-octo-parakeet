# Multilingual Quiz Application

A Next.js application for creating and taking quizzes with support for English and Arabic languages.

- Demo: https://legendary-octo-parakeet.vercel.app/     
  Use this built in credential for demo:  
- Username: vitey86243@pofmagic.com
- Password: 5vHs!2%sPrsa?YS

## Features

- User authentication (signup/login)
- Create, edit, and delete quizzes
- Take quizzes with automatic scoring
- View quiz results and top scores
- Multilingual support (English/Arabic)
- Right-to-left (RTL) layout support
- Real-time language switching

## Prerequisites

- Node.js 18 or later
- Supabase account

## Setup Instructions

1. Clone the repository

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database
   - Link to supabase project if you haven't
     ```bash
      supabase login
      supabase link
     ```
   - Run database migration
     ```bash
      supabase db push
     ```
   - The database schema will be automatically created using the migration files

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to the provided URL

## Usage

1. Register a new account or login
2. Create a quiz:
   - Click "Create Quiz"
   - Add title and description
   - Add questions with multiple choice options
   - Specify correct answers
3. Take a quiz:
   - Select a quiz from the home page
   - Answer questions within the time limit
   - View your score and rankings
4. Manage your quizzes:
   - View your created quizzes in "My Quizzes"
   - Edit or delete quizzes as needed

## Project Structure

- `/app` - Next.js application routes and API endpoints
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/supabase` - Database migrations and types
- `/hooks` - Utility React custom hooks
