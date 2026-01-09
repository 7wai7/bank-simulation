import { logout } from "../actions/logout";

export default function LogoutBtn() {
  return (
    <button
      onClick={() => logout()}
      className="
        px-3 py-1
        border border-emerald-500/40
        text-emerald-400 text-xs tracking-widest
        hover:bg-emerald-500/10
        transition
      "
    >
      Logout
    </button>
  );
}
