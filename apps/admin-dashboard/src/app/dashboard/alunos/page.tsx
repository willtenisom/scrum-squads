import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AlunosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Alunos</h1>
        <Link href="/dashboard/alunos/criar">
          <Button>Criar aluno</Button>
        </Link>
      </div>

      {}
      <div className="border rounded-md p-4">
        <p>Listagem de alunos (tabela aqui)</p>
        <Link href="/dashboard/alunos/1/editar">
          <Button variant="outline" className="mt-2">
            Editar aluno #1
          </Button>
        </Link>
      </div>
    </div>
  );
}
