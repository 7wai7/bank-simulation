"use client";

import { useState } from "react";
import { RegisterRequestDTO } from "../../domains/auth/auth.dto";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
} from "@/src/domains/auth/auth.schemas";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/domains/auth/auth.store";
import Link from "next/link";
import AuthForm from "../components/auth/AuthForm";
import AuthField from "../components/auth/AuthField";

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

  const register = useAuthStore((s) => s.register);
  const login = useAuthStore((s) => s.login);

  const onSubmit = async (e: React.FormEvent) => {
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

    (isSignup ? register : login)(dto)
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
    <main className="page bg-background border-none">
      <AuthForm
        title="AUTHORIZATION"
        subTitle="Enter your credentials to continue"
        canSubmit={canSubmit}
        submitText={loading ? "AUTHORIZING..." : isSignup ? "SIGNUP" : "LOGIN"}
        error={error}
        onSubmit={onSubmit}
        preFooter={
          <Link
            href={"/reset-password"}
            className="text-xs px-6 py-1 text-gray-300 hover:text-white font-bold"
          >
            Forgot password
          </Link>
        }
        footer={
          <>
            <span>All actions are logged</span>
            <button
              className="cursor-pointer text-gray-300 hover:text-white font-bold"
              onClick={() => setIsSignup((prev) => !prev)}
            >
              {isSignup ? "Login" : "Register"}
            </button>
          </>
        }
      >
        <AuthField label="USERNAME">
          <input
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
            type="text"
            required
            className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
          />
        </AuthField>
        {isSignup && (
          <AuthField label="EMAIL">
            <input
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              type="email"
              required
              className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
            />
          </AuthField>
        )}
        <AuthField label="PASSWORD">
          <input
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            type="password"
            required
            className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
          />
        </AuthField>
      </AuthForm>
    </main>
  );
}
