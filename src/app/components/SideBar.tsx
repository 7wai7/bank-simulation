import { UserDTO } from "@/src/domains/users/users.dto";
import LogoutBtn from "./LogoutBtn";

export default function SideBar({ user }: { user: UserDTO }) {
  return (
    <section
      className="
        w-[15%] h-max p-6 rounded-2xl mt-10
        border border-gray-500/20 bg-gray-950
      "
    >
      <div>
        <div className="text-xs text-gray-500 tracking-widest mb-2">
          ACCOUNT
        </div>

        <div className="text-sm text-gray-300 truncate">{user.username}</div>
        <div className="text-xs text-gray-400 truncate">{user.email}</div>
      </div>

      <hr className="h-0 block my-4 border-t border-gray-500/20" />

      <LogoutBtn />
    </section>
  );
}
