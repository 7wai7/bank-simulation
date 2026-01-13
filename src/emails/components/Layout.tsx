// emails/components/Layout.tsx
import React from "react";

export function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0b0b0b" }}>
        <table width="100%" cellPadding="0" cellSpacing="0">
          <tr>
            <td align="center">
              <table
                width="600"
                style={{
                  backgroundColor: "#111",
                  color: "#e5e5e5",
                  fontFamily: "monospace",
                  padding: "24px",
                  borderRadius: "8px",
                }}
              >
                {children}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
