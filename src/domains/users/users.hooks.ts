import { useQuery } from "@tanstack/react-query";
import { getUsersListByEmailApi } from "./users.api";

export function useGetUsersList(email: string, enabled?: boolean) {
  return useQuery({
    queryKey: ["get-users-by-email", email],
    queryFn: () => getUsersListByEmailApi(email),
    enabled: !!email.trim() && enabled,
  });
}
