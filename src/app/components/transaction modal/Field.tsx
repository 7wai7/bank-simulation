export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 tracking-widest mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
