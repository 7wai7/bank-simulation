import { UserDTO } from "@/src/domains/users/users.dto";
import { useGetUsersList } from "@/src/domains/users/users.hooks";
import clsx from "clsx";
import { memo } from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  email: string;
  children: React.ReactNode;
  onUseUser: (user: UserDTO) => void;
}

function UsersListTip({
  className,
  isOpen,
  email,
  children,
  onUseUser,
}: Props) {
  const { data: users, isLoading } = useGetUsersList(email, isOpen);

  return (
    <div className={clsx("relative", className)}>
      {children}
      {isOpen && (
        <MemoList users={users} isLoading={isLoading} onUseUser={onUseUser} />
      )}
    </div>
  );
}

function List({
  users,
  onUseUser,
}: {
  users?: UserDTO[];
  isLoading: boolean;
  onUseUser: (user: UserDTO) => void;
}) {
  if (!users) return null;

  return (
    <section
      data-users-list
      className="
        absolute left-0 right-0
        flex flex-col gap-2
        bg-black
        border border-gray-500/20
        px-4 py-2
      "
    >
      {users.map((u) => (
        <button
          key={u.id}
          className="text-start text-sm text-gray-300 hover:text-emerald-400"
          type="button"
          onClick={() => onUseUser(u)}
        >
          {u.email}
        </button>
      ))}
    </section>
  );
}

const MemoList = memo(List, (_, next) => next.isLoading);

export default memo(UsersListTip);
