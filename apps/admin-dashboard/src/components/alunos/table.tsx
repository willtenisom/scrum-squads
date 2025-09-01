"use client";

import AlunosActions from "./alunosActions";

type Aluno = {
  id: string;
  nome: string;
  email: string;
  turma_id: string;
};

export default function AlunosTable({ alunos }: { alunos: Aluno[] }) {
  return (
    <div className="rounded-md border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pl-6 pr-3">Nome</th>
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Turma</th>
            <th className="text-right py-2 pl-3 pr-6">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="border-b last:border-none">
              <td className="py-3 pl-6 pr-3">{aluno.nome}</td>
              <td className="py-3 px-3">{aluno.email}</td>
              <td className="py-3 px-3">{aluno.turma_id}</td>
              <td className="py-3 pl-3 pr-6">
                <div className="flex justify-end gap-2">
                  <AlunosActions id={aluno.id} />
                </div>
              </td>
            </tr>
          ))}

          {alunos.length === 0 && (
            <tr>
              <td className="py-6 pl-6 pr-3 text-muted-foreground" colSpan={4}>
                Nenhum aluno encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
