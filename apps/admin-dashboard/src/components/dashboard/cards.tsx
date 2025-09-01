import { Users, Building, Users2 } from "lucide-react";
import { getAlunos, getTurmas, getSquads } from "@/lib/api"; // Suas funções de API
import { lusitana } from "@/components/ui/fonts";

const iconMap = {
  alunos: Users,
  turmas: Building,
  squads: Users2,
};

async function Card({
  title,
  type,
}: {
  title: string;
  type: "alunos" | "turmas" | "squads";
}) {
  const Icon = iconMap[type];
  let value: number | string;

  try {
    // BUSCAR DADOS DA API
    if (type === "alunos") value = (await getAlunos()).length;
    else if (type === "turmas") value = (await getTurmas()).length;
    else value = (await getSquads()).length;
  } catch (error) {
    console.error("Database Error:", error);
    value = "N/A";
  }

  return (
    <div className="rounded-xl bg-white p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

export default async function CardWrapper() {
  return (
    <>
      <Card title="Total de Alunos" type="alunos" />
      <Card title="Total de Turmas" type="turmas" />
      <Card title="Total de Squads" type="squads" />
    </>
  );
}
