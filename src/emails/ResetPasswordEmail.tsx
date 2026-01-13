import {
  Html,
  Body,
  Container,
  Text,
  Button,
  Hr,
  Section,
} from "@react-email/components";

export type ResetPasswordEmailProps = {
  username: string;
  url: string;
};

export function ResetPasswordEmail({
  username,
  url,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Body
        style={{
          backgroundColor: "#000000",
          margin: 0,
          padding: "24px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#0f0f0f",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "560px",
            color: "#d1d5db",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#e5e7eb",
              marginBottom: "12px",
            }}
          >
            Reset Your Password
          </Text>

          {/* Greeting */}
          <Text style={{ fontSize: "14px", lineHeight: "1.6" }}>
            Hello <strong>{username}</strong>,
          </Text>

          {/* Instruction */}
          <Text style={{ fontSize: "14px", lineHeight: "1.6", marginTop: "8px" }}>
            We received a request to reset your password for your Token Bank account.
            <br />
            Click the button below to set a new password. This link will expire in 15 minutes.
          </Text>

          {/* CTA */}
          <Section style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Button
              href={url}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Reset Password
            </Button>
          </Section>

          {/* Note */}
          <Hr style={{ borderColor: "#1f2933", margin: "24px 0" }} />

          <Text
            style={{
              fontSize: "12px",
              color: "#6b7280",
              lineHeight: "1.5",
              marginTop: "16px",
            }}
          >
            If you didn’t request a password reset, you can safely ignore this email.
            <br />
            Your password will remain unchanged.
          </Text>

          {/* Footer */}
          <Hr style={{ borderColor: "#1f2933", margin: "24px 0" }} />

          <Text
            style={{
              fontSize: "11px",
              color: "#4b5563",
              textAlign: "center",
            }}
          >
            Token Bank Security System
            <br />
            This is an automated message, please do not reply.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
