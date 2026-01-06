export default function Footer() {
  return (
    <footer
      className="
      bg-linear-to-t from-gray-900 to-gray-950
      border-t border-gray-500/20
      px-6 py-4 text-gray-500 text-xs text-center relative
      "
    >
      <span>Token Bank Demo — simulated environment</span>

      {/* subtle scanline */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />
    </footer>
  );
}
