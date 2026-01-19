"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthForm from "../../../components/auth/AuthForm";
import AuthField from "../../../components/auth/AuthField";
import { useResetPasswordConfirm } from "@/src/domains/password/password.hooks";
import { RegisterRequestSchema } from "@/src/domains/auth/auth.schemas";
import z from "zod";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const { mutate, isPending, error } = useResetPasswordConfirm();
  const [err, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useParams();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Token not found");
      return;
    }

    const parseResult = z.uuid().safeParse(token);
    if (!parseResult.success) {
      setError("Invalid token");
      return;
    }

    const parsePassword = RegisterRequestSchema.pick({
      password: true,
    }).safeParse({
      password,
    });

    if (!parsePassword.success) {
      setError(parsePassword.error.issues[0].message);
      return;
    }

    mutate(
      { token: parseResult.data, password: parsePassword.data.password },
      { onSuccess: () => router.replace("/auth") }
    );
  };

  const canSubmit = !isPending && !!password.trim();
  const submitText = isPending ? "PENDING..." : "CHANGE PASSWORD";

  return (
    <AuthForm
      title="CHANGE PASSWORD"
      subTitle="Enter your new password to continue"
      canSubmit={canSubmit}
      submitText={submitText}
      error={error?.message ?? err}
      onSubmit={onSubmit}
    >
      <AuthField label="PASSWORD">
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          required
          className="bg-black text-white border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
        />
      </AuthField>
    </AuthForm>
  );
}
