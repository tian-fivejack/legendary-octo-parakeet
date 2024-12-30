import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <RegisterForm />
    </div>
  );
}
