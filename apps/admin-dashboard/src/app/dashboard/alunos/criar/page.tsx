import CreateForm from "@/components/alunos/create-form";
import { fetchTurmas } from "@/lib/data";

export default async function Page() {
  const turmas = await fetchTurmas("", 1);
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Adicionar Aluno
        </h1>
      </div>
      <CreateForm turmas={turmas} />
    </div>
  );
}
