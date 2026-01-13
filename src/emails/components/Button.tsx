// emails/components/Button.tsx
import React from "react";

export function EmailButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "12px 20px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        marginTop: "16px",
      }}
    >
      {label}
    </a>
  );
}
