import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TurmasPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Turmas</h1>
        <Link href="/dashboard/turmas/criar">
          <Button>Criar Turma</Button>
        </Link>
      </div>

      <div className="border rounded-md p-4">
        <p>Listagem de turmas (tabela aqui)</p>
        <Link href="/dashboard/turmas/1/editar">
          <Button variant="outline" className="mt-2">
            Editar Turma #1
          </Button>
        </Link>
      </div>
    </div>
  );
}
