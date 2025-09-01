"use client";

import { UpdateAluno, DeleteAluno } from "@/components/alunos/buttons";

type Aluno = {
  id: string;
  nome: string;
  email: string;
  turma_id: string;
};

export default function AlunosTable({ alunos }: { alunos: Aluno[] }) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Turma</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="hover:bg-gray-50">
              <td className="p-2 border">{aluno.nome}</td>
              <td className="p-2 border">{aluno.email}</td>
              <td className="p-2 border">{aluno.turma_id}</td>
              <td className="p-2 border space-x-2">
                <div className="flex justify-end gap-2">
                  <UpdateAluno id={aluno.id} />
                  <DeleteAluno id={aluno.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
