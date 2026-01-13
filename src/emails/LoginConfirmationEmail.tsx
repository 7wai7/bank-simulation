import {
  Html,
  Body,
  Container,
  Text,
  Button,
  Hr,
  Section,
} from "@react-email/components";

type LoginConfirmationEmailProps = {
  username: string;
  confirmUrl: string;
  ip?: string | null;
  userAgent?: string | null;
};

export function LoginConfirmationEmail({
  username,
  confirmUrl,
  ip,
  userAgent,
}: LoginConfirmationEmailProps) {
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
            New login attempt
          </Text>

          <Text style={{ fontSize: "14px", lineHeight: "1.6" }}>
            Hello <strong>{username}</strong>,
          </Text>

          <Text style={{ fontSize: "14px", lineHeight: "1.6" }}>
            We detected a login attempt to your account.
            <br />
            Please confirm this login to continue.
          </Text>

          {/* CTA */}
          <Section style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Button
              href={confirmUrl}
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
              Confirm login
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1f2933", margin: "24px 0" }} />

          {/* Metadata */}
          <Text
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              lineHeight: "1.5",
            }}
          >
            IP address: {ip ?? "Unknown"}
            <br />
            Device: {userAgent ?? "Unknown"}
          </Text>

          <Text
            style={{
              fontSize: "12px",
              color: "#6b7280",
              lineHeight: "1.5",
              marginTop: "16px",
            }}
          >
            If this wasn’t you, you can safely ignore this email.
            <br />
            The login attempt will be automatically rejected.
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
