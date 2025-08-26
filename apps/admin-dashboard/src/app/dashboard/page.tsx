"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const { token, user, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Redirecionando para o login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Bem-vindo(a), {user?.name || "Administrador"}!
            </p>
          </div>
          <Button onClick={logout} variant="destructive">
            Sair
          </Button>
        </div>
        <div className="mt-6">
          <p className="text-lg">gerenciar os registros das dailys.</p>
          {}
        </div>
      </div>
    </div>
  );
}
