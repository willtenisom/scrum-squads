import Form from "@/components/alunos/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchAlunoById, fetchTurmas } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const aluno = await fetchAlunoById(params.id);
  const turmas = await fetchTurmas("", 1);

  if (!aluno) {
    return <div>Aluno não encontrado</div>;
  }

  return (
    <div className="w-full space-y-6">
      {" "}
      {}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Editar Aluno
        </h1>
      </div>
      {}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Alunos", href: "/dashboard/alunos" },
          {
            label: "Editar Aluno",
            href: `/dashboard/alunos/${params.id}/editar`,
            active: true,
          },
        ]}
      />
      <div className="mt-6">
        {" "}
        {}
        <Form aluno={aluno} turmas={turmas} />
      </div>
    </div>
  );
}
