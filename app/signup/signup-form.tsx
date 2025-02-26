"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { signUp } from "../lib/actions";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const initialState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
            aria-invalid={!!state.errors?.email}
            aria-describedby="email-error"
          />
          {state.errors?.email && (
            <div id="email-error" className="text-red-500">
              <p>{state.errors.email}</p>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!state.errors?.password}
            aria-describedby="password-error"
          />
          {state.errors?.password && (
            <div id="password-error" className="text-red-500">
              <p>{state.errors.password}</p>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={
              !!state.errors?.confirmPassword || !!state.errors?.passwordsMatch
            }
            aria-describedby="confirm-password-error"
          />
          {(state.errors?.confirmPassword || state.errors?.passwordsMatch) && (
            <div id="confirm-password-error" className="text-red-500">
              <p>{state.errors.confirmPassword}</p>
              <p>{state.errors.passwordsMatch}</p>
            </div>
          )}
        </div>
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <div>
        <button
          type="submit"
          disabled={isPending}
          className="group relative flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
