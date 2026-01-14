import { fetcher } from "@/src/lib/fetcher";
import api from "@/src/lib/axios";
import { UserDTO } from "./users.dto";

export const getUsersListByEmailApi = async (email: string) =>
  fetcher<UserDTO[]>(
    api.get("/api/users", {
      params: {
        email,
        limit: 10,
      },
    })
  );
