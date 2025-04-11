"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useRedirect = (redirect: string) => {
  const { user, loading } = useUserContext();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || !user.email) {
        router.push(redirect);
      } else {
        setReady(true);
      }
    }
  }, [user, loading, redirect, router]);

  return ready;
};

export default useRedirect;

