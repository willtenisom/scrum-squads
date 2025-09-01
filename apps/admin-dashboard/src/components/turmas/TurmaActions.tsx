"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { UpdateTurma, DeleteTurma } from "./buttons";

export default function TurmaActions({ id }: { id: string | number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {}
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
            {}
            <UpdateTurma id={id} variant="menu" />
            <DeleteTurma id={id} variant="menu" />
          </div>
        </div>
      )}
    </div>
  );
}
