import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
      relative
      bg-linear-to-b from-gray-900 to-gray-950
      px-6 py-4
      border-b border-gray-500/20
      flex justify-between items-center
      font-mono
    "
    >
      {/* Logo */}
      <Link href="/" className="group">
        <h1
          className="
          text-xl font-bold tracking-wider
          text-gray-300
          group-hover:text-white
          transition-colors
        "
        >
          TOKEN<span className="text-gray-500">_</span>BANK
        </h1>
        <div className="text-[10px] text-gray-500 tracking-widest">
          SECURE LEDGER SIMULATION
        </div>
      </Link>

      {/* subtle scanline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />
    </header>
  );
}
