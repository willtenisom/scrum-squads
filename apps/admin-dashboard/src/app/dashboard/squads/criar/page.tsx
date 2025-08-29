"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CriarSquadPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Squad criado!");
    router.push("/dashboard/squads");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Criar Squad</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do squad"
          className="border rounded-md px-3 py-2 w-full"
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
