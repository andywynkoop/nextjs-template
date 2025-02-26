import Link from "next/link";
import { Metadata } from "next";
import SignUpForm from "./signup-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <Suspense>
          <SignUpForm />
        </Suspense>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-500 hover:text-blue-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
