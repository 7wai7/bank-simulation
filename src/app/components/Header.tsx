import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 px-6 py-4 shadow-md flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-xl font-bold text-gray-400">Token Bank</h1>
      </Link>
      <span className="text-xs text-gray-500 tracking-widest">
        SECURE ACCESS
      </span>
    </header>
  );
}
