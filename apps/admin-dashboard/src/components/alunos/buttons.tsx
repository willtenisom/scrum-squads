import Link from "next/link";
import { Button } from "@/components/ui/button"; // Importe o componente Button aqui
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function CreateAluno() {
  return (
    <Link
      href="/dashboard/alunos/criar"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="hidden md:block">Adicionar Aluno</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAluno({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/alunos/${id}/editar`}>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <PencilIcon className="h-4 w-4" />
        Editar
      </Button>
    </Link>
  );
}

export function DeleteAluno({ id }: { id: string }) {
  return (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <TrashIcon className="h-4 w-4" />
        Excluir
      </Button>
    </>
  );
}
