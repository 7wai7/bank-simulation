import clsx from "clsx";
import Link from "next/link";
import { FormEvent } from "react";

interface Props {
  title: string;
  subTitle: string;
  canSubmit: boolean;
  submitText: string;
  error?: string | null;
  onSubmit: (e: FormEvent) => void;
  children: React.ReactNode;
  preFooter?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthForm({
  title,
  subTitle,
  canSubmit,
  submitText,
  error,
  onSubmit,
  children,
  preFooter,
  footer,
}: Props) {
  return (
    <div className="w-full bg-gray-950 m-auto max-w-md border border-gray-500/20">
      {/* Title */}
      <div className="px-6 py-4 border-b border-gray-500/20">
        <h2 className="text-sm tracking-wider font-semibold text-gray-400">
          {title}
        </h2>
        <p className="text-xs text-gray-500 mt-1">{subTitle}</p>
      </div>

      {/* Form */}
      <form className="p-6 flex flex-col space-y-4" onSubmit={onSubmit}>
        {children}

        <div className="min-h-9">
          {error && (
            <div className="text-xs text-red-400 border border-red-400/30 px-3 py-2">
              {error}
            </div>
          )}
        </div>

        <button
          disabled={!canSubmit}
          type="submit"
          className={clsx(
            "mt-2 px-4 py-2 border text-sm tracking-wider transition cursor-pointer",
            !canSubmit
              ? "border-gray-700 text-gray-600 cursor-not-allowed"
              : "border-gray-500/40 hover:border-gray-400 hover:text-white animate-[pulse_2s_ease_infinite]"
          )}
        >
          {submitText}
        </button>
      </form>

      {preFooter}

      {/* Footer hint */}
      {footer && (
        <div className="px-6 py-3 border-t border-gray-500/20 text-xs text-gray-500 flex justify-between">
          {footer}
        </div>
      )}
    </div>
  );
}
