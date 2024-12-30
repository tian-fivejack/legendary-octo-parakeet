import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      {/* <div className="max-w-md w-full"> */}
      {/* <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1> */}
      <RegisterForm />
      {/* </div> */}
    </div>
  );
}
