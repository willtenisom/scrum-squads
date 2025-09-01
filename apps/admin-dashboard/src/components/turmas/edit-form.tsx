"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditTurmaForm({
  turma,
}: {
  turma: { id: string; nome: string; ano: string };
}) {
  const [form, setForm] = useState({ nome: turma.nome, ano: turma.ano });

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Salvar turma:", { id: turma.id, ...form });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-4 bg-white rounded-lg border"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          name="nome"
          value={form.nome}
          onChange={onChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ano</label>
        <input
          name="ano"
          value={form.ano}
          onChange={onChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <Button type="submit">Salvar alterações</Button>
    </form>
  );
}
