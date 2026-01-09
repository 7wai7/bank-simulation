import LogoutBtn from "./LogoutBtn";
import { UserJwtDTO } from "@/src/domains/auth/auth.dto";

export default function SideBar({ user }: { user: UserJwtDTO }) {
  return (
    <section
      className="
        w-[15%] h-max p-6 rounded-2xl mt-10
        border border-gray-500/20 bg-gray-950
      "
    >
      <div className="flex flex-col mb-5 whitespace-nowrap">
        <div className="text-xs text-gray-500 tracking-widest mb-3">
          AUTHORIZED USER
        </div>
        <span className="text-gray-300 text-sm overflow-hidden text-ellipsis line-clamp-1">{user.username}</span>
        <span className="text-gray-400 text-xs overflow-hidden text-ellipsis line-clamp-1">{user.email}</span>
      </div>

      <LogoutBtn />
    </section>
  );
}
