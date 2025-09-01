"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import Image from "next/image";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import NavLinks from "@/components/dashboard/NavLinks";

export default function SideNav() {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    await logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

        <div className="relative mt-auto">
          <div
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={toggleMenu}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={
                  user?.avatar ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt="Foto do perfil"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="hidden md:block text-sm">
              <div className="font-medium truncate">
                {user?.name || "Nome Usuário"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email || "email@exemplo.com"}
              </div>
            </div>
          </div>

          {}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute bottom-full mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-10"
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="font-medium text-sm truncate">
                  {user?.name || "Nome Usuário"}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user?.email || "email@exemplo.com"}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 p-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="ml-1">Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
