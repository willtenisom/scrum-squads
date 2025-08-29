"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditarSquadPage() {
  const { id } = useParams();
  const router = useRouter();
  const [nome, setNome] = useState("Squad Exemplo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Squad ${id} atualizado!`);
    router.push("/dashboard/squads");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Squad #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />
        <Button type="submit">Salvar alterações</Button>
      </form>
    </div>
  );
}
