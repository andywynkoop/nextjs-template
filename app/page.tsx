import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andy Wynkoop",
  description: "andy Wynkoop's Next.js Project",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
        <p className="text-lg text-gray-600">
          Please login or create an account to continue
        </p>

        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
