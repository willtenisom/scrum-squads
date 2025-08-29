import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SquadsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Squads</h1>
        <Link href="/dashboard/squads/criar">
          <Button>Criar Squad</Button>
        </Link>
      </div>

      <div className="border rounded-md p-4">
        <p>Listagem de squads (tabela aqui)</p>
        <Link href="/dashboard/squads/1/editar">
          <Button variant="outline" className="mt-2">
            Editar Squad #1
          </Button>
        </Link>
      </div>
    </div>
  );
}
