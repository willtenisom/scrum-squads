import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function CreateAluno() {
  return (
    <Link href="/dashboard/alunos/criar">
      <Button className="flex items-center gap-2">
        <PlusIcon className="h-4 w-4" />
        Adicionar Aluno
      </Button>
    </Link>
  );
}

export function UpdateAluno({
  id,
  isMenu = false,
}: {
  id: string;
  isMenu?: boolean;
}) {
  if (isMenu) {
    return (
      <Link
        href={`/dashboard/alunos/${id}/editar`}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <PencilIcon className="mr-3 h-4 w-4 text-gray-400" />
        Editar
      </Link>
    );
  }

  return (
    <Link href={`/dashboard/alunos/${id}/editar`}>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <PencilIcon className="h-4 w-4" />
        Editar
      </Button>
    </Link>
  );
}

export function DeleteAluno({
  id,
  isMenu = false,
}: {
  id: string;
  isMenu?: boolean;
}) {
  if (isMenu) {
    return (
      <form action={`/dashboard/alunos/delete/${id}`} method="POST">
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
    <form action={`/dashboard/alunos/delete/${id}`} method="POST">
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <TrashIcon className="h-4 w-4" />
        Excluir
      </Button>
    </form>
  );
}
