"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Carregando...</p>
    </div>
  );
}
