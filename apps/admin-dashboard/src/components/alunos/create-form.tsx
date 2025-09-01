"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Turma = {
  id: string;
  nome: string;
};

export default function CreateForm({ turmas }: { turmas: Turma[] }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    turma_id: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Enviando aluno:", formData);
    // POST DA API
  }

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
          value={formData.nome}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Turma</label>
        <select
          name="turma_id"
          value={formData.turma_id}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
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

      <Button type="submit">Adicionar Aluno</Button>
    </form>
  );
}
