"use client";

import SquadsActions from "./squads-actions";

type Squad = {
  id: string;
  name: string;
};

export default function SquadsTable({ squads }: { squads: Squad[] }) {
  return (
    <div className="rounded-md border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pl-6 pr-3">Nome</th>
            <th className="text-right py-2 pl-3 pr-6">Ações</th>
          </tr>
        </thead>
        <tbody>
          {squads.map((squad) => (
            <tr key={squad.id} className="border-b last:border-none">
              <td className="py-3 pl-6 pr-3">{squad.name}</td>
              <td className="py-3 pl-3 pr-6">
                <div className="flex justify-end">
                  <SquadsActions id={squad.id} />
                </div>
              </td>
            </tr>
          ))}

          {squads.length === 0 && (
            <tr>
              <td className="py-6 pl-6 pr-3 text-muted-foreground" colSpan={2}>
                Nenhum squad encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
