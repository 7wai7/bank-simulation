"use client";

import { FormEvent, useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import AuthField from "../../components/auth/AuthField";
import { useSendMailToResetPassword } from "@/src/domains/password/password.hooks";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, error } = useSendMailToResetPassword();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(email, { onSuccess: () => setSubmitted(true) });
  };

  if (submitted) {
    return (
      <div className="m-auto border border-gray-500/30 bg-black p-8 max-w-md text-sm text-gray-300 space-y-4">
        <h1 className="text-lg font-semibold tracking-wider">
          CHECK YOUR EMAIL
        </h1>

        <p>
          If an account with this email exists, we have sent a password reset
          link.
        </p>

        <ul className="text-xs text-gray-500 space-y-1">
          <li>• The link expires in 15 minutes</li>
          <li>• Check your spam or junk folder</li>
          <li>• You can safely close this page</li>
        </ul>
      </div>
    );
  }

  const canSubmit = !isPending && !!email.trim();
  const submitText = isPending ? "PENDING..." : "SEND AN EMAIL";

  return (
    <AuthForm
      title="CHANGE PASSWORD"
      subTitle="Enter your email to continue"
      canSubmit={canSubmit}
      submitText={submitText}
      error={error?.message}
      onSubmit={onSubmit}
    >
      <AuthField label="EMAIL">
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          required
          className="bg-black text-white border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
        />
      </AuthField>
    </AuthForm>
  );
}
