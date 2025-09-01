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
    <main>
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

      <Form aluno={aluno} turmas={turmas} />
    </main>
  );
}
