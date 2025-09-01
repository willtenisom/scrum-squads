import Form from "@/components/squads/edit-form";
import { fetchSquadById } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const squad = await fetchSquadById(id);

  if (!squad) {
    return <div>Squad não encontrado</div>;
  }

  return (
    <main>
      {}
      <Form initialData={{ name: squad.name }} />
    </main>
  );
}
