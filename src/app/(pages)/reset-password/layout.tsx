interface Props {
  children: React.ReactNode;
}

export default function resetPasswordLayout({ children }: Props) {
  return <main className="page bg-background border-none">{children}</main>;
}
