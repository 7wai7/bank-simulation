"use client";

import { useState } from "react";
import clsx from "clsx";
import { RegisterRequestDTO } from "../../domains/auth/auth.dto";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
} from "@/src/domains/auth/auth.schemas";
import { loginApi, registerApi } from "@/src/domains/auth/auth.api";
import { useRouter } from "next/navigation";

type AuthFormState = RegisterRequestDTO;

const initialState: AuthFormState = {
  username: "",
  email: "",
  password: "",
};

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [state, setState] = useState<AuthFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const parsed = (
      isSignup ? RegisterRequestSchema : LoginRequestSchema
    ).safeParse(state);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    const dto = parsed.data as RegisterRequestDTO;

    (isSignup ? registerApi : loginApi)(dto)
      .then(() => router.push("/"))
      .catch((e) => e instanceof Error && setError(e.message))
      .finally(() => setLoading(false));
  };

  const canSubmit =
    !loading &&
    !!state.username.trim() &&
    (!isSignup || !!state.email.trim()) &&
    !!state.password.trim();

  return (
    <>
      <div className="w-full m-auto max-w-md border border-gray-500/20">
        {/* Title */}
        <div className="px-6 py-4 border-b border-gray-500/20">
          <h2 className="text-sm tracking-wider font-semibold text-gray-400">
            AUTHORIZATION
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form className="p-6 flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              USERNAME
            </label>
            <input
              value={state.username}
              onChange={(e) => setState({ ...state, username: e.target.value })}
              type="email"
              required
              className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
            />
          </div>

          {isSignup && (
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-gray-500 tracking-wider">
                EMAIL
              </label>
              <input
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                type="email"
                required
                className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
          )}

          <div className="flex flex-col space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              PASSWORD
            </label>
            <input
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              type="password"
              required
              className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
            />
          </div>

          <div className="min-h-9">
            {error && (
              <div className="text-xs text-red-400 border border-red-400/30 px-3 py-2">
                {error}
              </div>
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={!canSubmit}
            type="submit"
            className={clsx(
              "mt-2 px-4 py-2 border text-sm tracking-wider transition cursor-pointer",
              !canSubmit
                ? "border-gray-700 text-gray-600 cursor-not-allowed"
                : "border-gray-500/40 hover:border-gray-400 hover:text-white animate-[pulse_2s_ease_infinite]"
            )}
          >
            {loading ? "AUTHORIZING..." : isSignup ? "SIGNUP" : "LOGIN"}
          </button>
        </form>

        {/* Footer hint */}
        <div className="px-6 py-3 border-t border-gray-500/20 text-xs text-gray-500 flex justify-between">
          <span>All actions are logged</span>
          <button
            className="cursor-pointer text-gray-300 font-bold"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </>
  );
}
