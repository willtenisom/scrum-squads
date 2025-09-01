"use client";

import { EditSquadButton } from "./buttons";

type Squad = {
  id: string;
  name: string;
};

export default function SquadsTable({ squads }: { squads: Squad[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Nome</th>
          <th className="p-2 text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        {squads.map((squad) => (
          <tr key={squad.id} className="border-t">
            <td className="p-2">{squad.name}</td>
            <td className="p-2 text-right">
              <EditSquadButton id={squad.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
