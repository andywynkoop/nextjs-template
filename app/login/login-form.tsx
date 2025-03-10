"use client";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { authenticate } from "../lib/actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className="mt-8 space-y-6" action={formAction}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {errorMessage && (
        <div id="error-message" className="text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          disabled={isPending}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
