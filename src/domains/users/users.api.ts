import { fetcher } from "@/src/lib/fetcher";
import { UserDTO } from "../auth/auth.dto";
import api from "@/src/lib/axios";

export const getUsersListByEmailApi = async (email: string) =>
  fetcher<UserDTO[]>(
    api.get("/api/users", {
      params: {
        email,
        limit: 10,
      },
    })
  );
