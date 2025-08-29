"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CriarTurmaPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Turma criada!");
    router.push("/dashboard/turmas");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Criar Turma</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome da turma"
          className="border rounded-md px-3 py-2 w-full"
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
