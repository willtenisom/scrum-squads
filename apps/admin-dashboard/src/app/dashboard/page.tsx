"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import { Button } from "@/components/ui/button";

interface Aluno {
  _id: string;
  nome: string;
  email: string;
}

interface AlunoWithSource extends Aluno {
  source: "turma" | "squad" | "both";
}

export default function DashboardPage() {
  const router = useRouter();
  const { token, user, logout } = useAuth();

  const [alunos, setAlunos] = useState<AlunoWithSource[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else if (user?.role === "user") {
      fetchAlunos();
    }
  }, [token, user, router]);

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const turmaAlunos: Aluno[] = user?.turmaId
        ? await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/turmas/${user.turmaId}/alunos`,
            { headers: { Authorization: `Bearer ${token}` } }
          ).then(res => res.json())
        : [];

      const squadAlunos: Aluno[] = user?.squadId
        ? await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/squads/${user.squadId}/alunos`,
            { headers: { Authorization: `Bearer ${token}` } }
          ).then(res => res.json())
        : [];

      const map = new Map<string, AlunoWithSource>();

      turmaAlunos.forEach(aluno => {
        map.set(aluno._id, { ...aluno, source: "turma" });
      });

      squadAlunos.forEach(aluno => {
        if (map.has(aluno._id)) {
          map.set(aluno._id, { ...aluno, source: "both" });
        } else {
          map.set(aluno._id, { ...aluno, source: "squad" });
        }
      });

      setAlunos(Array.from(map.values()));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Redirecionando para o login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user?.role === "admin" ? "Admin Dashboard" : "Aluno Dashboard"}
            </h1>
            <p className="text-gray-600">
              {user?.role === "admin"
                ? `Bem-vindo(a), ${user.nome || "Administrador"}!`
                : `Bem-vindo(a), ${user.nome || "Aluno"}!`}
            </p>
          </div>
          <Button onClick={logout} variant="destructive">
            Sair
          </Button>
        </div>

        {user?.role === "admin" ? (
          <div className="mt-6">
            <p className="text-lg">Aqui você pode gerenciar os registros das dailys e turmas.</p>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-lg mb-2">Colegas da sua turma e squad:</p>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {alunos.map((aluno) => (
                  <li key={aluno._id}>
                    {aluno.nome} ({aluno.email}){" "}
                    <span className={`px-1 rounded text-white text-xs ml-2 ${
                      aluno.source === "turma"
                        ? "bg-blue-500"
                        : aluno.source === "squad"
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}>
                      {aluno.source === "both"
                        ? "Turma + Squad"
                        : aluno.source === "turma"
                        ? "Turma"
                        : "Squad"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
