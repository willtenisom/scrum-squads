"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Turma = {
  id: string;
  nome: string;
};

type Aluno = {
  id: string;
  nome: string;
  email: string;
  turma_id: string;
};

export default function EditForm({
  aluno,
  turmas,
}: {
  aluno: Aluno;
  turmas: Turma[];
}) {
  const [form, setForm] = useState({
    nome: aluno.nome,
    email: aluno.email,
    turma_id: aluno.turma_id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados editados:", { id: aluno.id, ...form });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg border"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Turma</label>
        <select
          name="turma_id"
          value={form.turma_id}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        >
          <option value="">Selecione uma turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit">Salvar alterações</Button>
    </form>
  );
}
