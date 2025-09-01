"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { UpdateAluno, DeleteAluno } from "./buttons";

export default function AlunosActions({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 p-0"
      >
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <UpdateAluno id={id} isMenu={true} />
            <DeleteAluno id={id} isMenu={true} />
          </div>
        </div>
      )}
    </div>
  );
}
