"use client";

import { useState } from "react";

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
      className="space-y-4 max-w-md p-4 border rounded-lg"
    >
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Turma</label>
        <select
          name="turma_id"
          value={form.turma_id}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border px-3 py-2"
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

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Salvar alterações
      </button>
    </form>
  );
}
