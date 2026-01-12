import { NextRequest } from "next/server";

export const req__mock = {
  cookies: {
    get: () => null,
    set: () => {},
  },
  headers: {
    get: (name: string) => {
      if (name.toLowerCase() === "user-agent") return "seed-script";
      return null;
    },
  },
  url: "",
  method: "POST",
} as unknown as NextRequest;
