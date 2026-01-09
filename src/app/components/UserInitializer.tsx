"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/domains/auth/auth.store";

export default function UserInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setUser, me } = useAuthStore();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["current-user"],
    queryFn: me,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) setUser(data);
    if (!isLoading && !data) router.replace("/auth");
  }, [data, isSuccess, isLoading, setUser, router]);

  if (isLoading) return <p>Loading</p>;

  return <>{children}</>;
}
