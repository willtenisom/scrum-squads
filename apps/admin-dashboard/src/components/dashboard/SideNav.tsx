"use client";

import Link from "next/link";
import NavLinks from "@/components/dashboard/NavLinks";
import { useAuth } from "@/app/context/auth";
import { PowerIcon } from "lucide-react";

export default function SideNav() {
  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white border-r">
      <Link
        className="mb-4 flex h-20 items-center justify-start p-4 md:h-24"
        href="/dashboard"
      >
        <h1 className="text-2xl font-bold text-blue-600">Daily Scrum</h1>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow md:block"></div>

        <form
          action={async () => {
            await logout();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sair</div>
          </button>
        </form>
      </div>
    </div>
  );
}
