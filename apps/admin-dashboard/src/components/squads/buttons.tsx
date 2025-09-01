"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export function CreateSquadButton() {
  return (
    <Button asChild>
      <Link href="/dashboard/squads/criar">+ Criar Squad</Link>
    </Button>
  );
}

export function EditSquadButton({
  id,
  isMenu = false,
}: {
  id: string;
  isMenu?: boolean;
}) {
  if (isMenu) {
    return (
      <Link
        href={`/dashboard/squads/${id}/editar`}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <PencilIcon className="mr-3 h-4 w-4 text-gray-400" />
        Editar
      </Link>
    );
  }

  return (
    <Button asChild variant="outline">
      <Link href={`/dashboard/squads/${id}/editar`}>
        <PencilIcon className="h-4 w-4" />
        Editar
      </Link>
    </Button>
  );
}

export function DeleteSquadButton({
  id,
  isMenu = false,
}: {
  id: string;
  isMenu?: boolean;
}) {
  if (isMenu) {
    return (
      <form action={`/dashboard/squads/delete/${id}`} method="POST">
        <button
          type="submit"
          className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <TrashIcon className="mr-3 h-4 w-4 text-gray-400" />
          Excluir
        </button>
      </form>
    );
  }

  return (
    <form action={`/dashboard/squads/delete/${id}`} method="POST">
      <Button variant="outline" className="flex items-center gap-1">
        <TrashIcon className="h-4 w-4" />
        Excluir
      </Button>
    </form>
  );
}
