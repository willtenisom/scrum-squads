import Breadcrumbs from "@/components/ui/breadcrumbs";
import EditTurmaForm from "@/components/turmas/edit-form";
import { fetchTurmaById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const turma = await fetchTurmaById(params.id);

  if (!turma) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Turmas", href: "/dashboard/turmas" },
          {
            label: "Editar Turma",
            href: `/dashboard/turmas/${params.id}/editar`,
            active: true,
          },
        ]}
      />
      {}
      <EditTurmaForm turma={turma} />
    </main>
  );
}
