export default function AuthField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs text-gray-500 tracking-wider">{label}</label>
      {children}
    </div>
  );
}
