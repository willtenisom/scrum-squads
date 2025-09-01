import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

function CreateTurma() {
  return (
    <Link href="/dashboard/turmas/criar">
      <Button className="flex items-center gap-2">
        <PlusIcon className="h-4 w-4" />
        Criar Turma
      </Button>
    </Link>
  );
}

function UpdateTurma({ id }: { id: string | number }) {
  return (
    <Link href={`/dashboard/turmas/${id}/editar`}>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <PencilIcon className="h-4 w-4" />
        Editar
      </Button>
    </Link>
  );
}

function DeleteTurma({ id }: { id: string | number }) {
  return (
    <Button variant="outline" size="sm" className="flex items-center gap-1">
      <TrashIcon className="h-4 w-4" />
      Excluir
    </Button>
  );
}

export { CreateTurma, UpdateTurma, DeleteTurma };
