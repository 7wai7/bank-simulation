"use client";

import { FormEvent, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthField from "../components/auth/AuthField";
import { useSendMailToResetPassword } from "@/src/domains/password/password.hooks";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, error } = useSendMailToResetPassword();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  const canSubmit = !isPending && !!email.trim();
  const submitText = isPending ? "PENDING..." : "SEND AN EMAIL";

  return (
    <main className="page bg-background border-none">
      <AuthForm
        title="CHANGE PASSWORD"
        subTitle="Enter your email to continue"
        canSubmit={canSubmit}
        submitText={submitText}
        error={error?.message}
        onSubmit={onSubmit}
        footer={
          <span>
            If an account with this email exists, we sent a reset link.
          </span>
        }
      >
        <AuthField label="EMAIL">
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            required
            className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
          />
        </AuthField>
      </AuthForm>
    </main>
  );
}
