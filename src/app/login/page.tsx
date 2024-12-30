import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-10">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Quiz App Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
