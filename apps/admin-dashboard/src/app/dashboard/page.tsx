"use client";

import { Users, GraduationCap, Layers } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const GraficoCircular = dynamic(
  () => import("@/components/dashboard/grafico-circular"),
  { ssr: false }
);

export default function DashboardPage() {
  // Mock temporário (até conectar ao backend)
  const totalAlunos = 120;
  const totalTurmas = 8;
  const totalSquads = 5;

  const alunosAtivos = 75;
  const squadsComTurma = 40;

  return (
    <div className="p-6 space-y-10">
      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-600">Total de Alunos</span>
          </div>
          <p className="text-4xl font-bold text-gray-800">{totalAlunos}</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-600">Total de Turmas</span>
          </div>
          <p className="text-4xl font-bold text-gray-800">{totalTurmas}</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-gray-600">Total de Squads</span>
          </div>
          <p className="text-4xl font-bold text-gray-800">{totalSquads}</p>
        </div>
      </div>

      {/* Indicadores com gráficos circulares */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GraficoCircular
          title="% de Alunos Ativos"
          value={alunosAtivos}
          color="#3b82f6"
        />
        <GraficoCircular
          title="% de Squads com Turmas"
          value={squadsComTurma}
          color="#10b981"
        />
      </div>

      {/* Últimos alunos cadastrados */}
      <div>
        <Card className="rounded-2xl border bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Últimos Alunos Cadastrados
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>👤 João Silva</li>
            <li>👤 Maria Oliveira</li>
            <li>👤 Pedro Santos</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
