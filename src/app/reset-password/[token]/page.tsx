"use client";

import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import AuthField from "../../components/auth/AuthField";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useParams();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(token);
  };

  const canSubmit = !loading && !!password.trim();

  return (
    <main className="page bg-background border-none">
      <AuthForm
        title="CHANGE PASSWORD"
        subTitle="Enter your new password to continue"
        canSubmit={canSubmit}
        submitText={loading ? "PENDING..." : "CHANGE PASSWORD"}
        error={error}
        onSubmit={onSubmit}
      >
        <AuthField label="PASSWORD">
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            required
            className="bg-black border border-gray-500/30 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
          />
        </AuthField>
      </AuthForm>
    </main>
  );
}
