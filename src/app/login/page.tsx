import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-10">
      <LoginForm />
    </div>
  );
}
