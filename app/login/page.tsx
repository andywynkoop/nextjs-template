import Link from "next/link";
import { Metadata } from "next";
import LoginForm from "./login-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-500 hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
