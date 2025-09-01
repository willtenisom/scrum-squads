import Form from "@/components/turmas/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Turmas", href: "/dashboard/turmas" },
          {
            label: "Criar Turma",
            href: "/dashboard/turmas/criar",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
