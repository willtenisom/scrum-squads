"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GraficoCircularProps {
  value: number;
  title: string;
  color?: string;
}

export default function GraficoCircular({
  value,
  title,
  color = "#3b82f6",
}: GraficoCircularProps) {
  const data = [
    { name: "Preenchido", value: value },
    { name: "Vazio", value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-md font-medium text-gray-700 mb-4">{title}</h3>
      <div className="w-32 h-32">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              <Cell key="preenchido" fill={color} />
              <Cell key="vazio" fill="#e5e7eb" /> {}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-lg font-bold text-gray-800 mt-2">{value}%</p>
    </div>
  );
}
