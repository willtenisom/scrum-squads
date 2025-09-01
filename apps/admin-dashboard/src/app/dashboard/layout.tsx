"use client";

import { useAuth } from "@/app/context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideNav from "@/components/dashboard/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token !== undefined) {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (loading) return;

    if (!token) {
      router.push("/login");
    } else if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [loading, token, user, router]);

  if (loading || !token || (user && user.role !== "admin")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Verificando permissões...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
