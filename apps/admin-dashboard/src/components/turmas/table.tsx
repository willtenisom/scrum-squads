import TurmaActions from "./TurmaActions";

type Turma = {
  id: string | number;
  nome: string;
  ano: string;
};

export default function Table({ turmas }: { turmas: Turma[] }) {
  return (
    <div className="rounded-md border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pl-6 pr-3">Nome</th>
            <th className="text-left py-2 px-3">Ano</th>
            <th className="text-right py-2 pl-3 pr-6">Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((t) => (
            <tr key={t.id} className="border-b last:border-none">
              <td className="py-3 pl-6 pr-3">{t.nome}</td>
              <td className="py-3 px-3">{t.ano}</td>
              <td className="py-3 pl-3 pr-6">
                {}
                <div className="flex justify-end">
                  <TurmaActions id={t.id} />
                </div>
              </td>
            </tr>
          ))}

          {turmas.length === 0 && (
            <tr>
              <td className="py-6 pl-6 pr-3 text-muted-foreground" colSpan={3}>
                Nenhuma turma encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
