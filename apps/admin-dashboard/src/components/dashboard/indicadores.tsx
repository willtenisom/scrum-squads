"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Indicadores() {
  const alunosAtivos = 75;
  const squadsComTurma = 40;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>% de Alunos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={alunosAtivos} />
          <p className="mt-2 text-sm text-gray-600">{alunosAtivos}% ativos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>% de Squads com Turmas</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={squadsComTurma} />
          <p className="mt-2 text-sm text-gray-600">
            {squadsComTurma}% vinculados
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
