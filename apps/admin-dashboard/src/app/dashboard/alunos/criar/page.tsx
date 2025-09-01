import Form from "@/components/alunos/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchTurmas } from "@/lib/data";

export default async function Page() {
  const turmas = await fetchTurmas("", 1);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Alunos", href: "/dashboard/alunos" },
          {
            label: "Criar Aluno",
            href: "/dashboard/alunos/criar",
            active: true,
          },
        ]}
      />

      <Form turmas={turmas} />
    </main>
  );
}
