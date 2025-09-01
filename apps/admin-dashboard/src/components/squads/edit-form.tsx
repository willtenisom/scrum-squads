"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditSquadForm({
  initialData,
}: {
  initialData: { name: string };
}) {
  const [name, setName] = useState(initialData.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Editar Squad:", { name });
    // FAZER CHAMA API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Nome do Squad</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do squad"
        />
      </div>

      <Button type="submit">Atualizar</Button>
    </form>
  );
}
