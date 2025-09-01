// ===== Mock ALUNOS =====
const allAlunos = [
  { id: "1", nome: "João Silva", email: "joao@gmail.com", turma_id: "A" },
  { id: "2", nome: "Maria Souza", email: "maria@gmail.com", turma_id: "B" },
  { id: "3", nome: "Pedro Costa", email: "pedro@gmail.com", turma_id: "C" },
];

export async function fetchAlunos(query: string, page: number) {
  return allAlunos.filter((a) =>
    a.nome.toLowerCase().includes(query.toLowerCase())
  );
}

export async function fetchAlunosPages(query: string) {
  return 1;
}

export async function fetchAlunoById(id: string) {
  return allAlunos.find((a) => a.id === id) || null;
}

// ===== Mock TURMAS =====
export type Turma = { id: string; nome: string; ano: string };

const allTurmas: Turma[] = [
  { id: "A", nome: "Turma A", ano: "2024" },
  { id: "B", nome: "Turma B", ano: "2024" },
  { id: "C", nome: "Turma C", ano: "2025" },
];

export async function fetchTurmas(query: string, page: number) {
  const q = (query || "").toLowerCase();
  return allTurmas.filter(
    (t) => t.nome.toLowerCase().includes(q) || t.ano.includes(q)
  );
}

export async function fetchTurmasPages(query: string) {
  return 1;
}

export async function fetchTurmaById(id: string) {
  return allTurmas.find((t) => t.id === id) || null;
}

// Mock ===== SQUADS =====
export type Squad = { id: string; name: string };

const allSquads: Squad[] = [
  { id: "1", name: "Norts" },
  { id: "2", name: "Backend" },
  { id: "3", name: "DevOps" },
];

export async function fetchSquads(query: string, page: number) {
  const q = (query || "").toLowerCase();
  return allSquads.filter((s) => s.name.toLowerCase().includes(q));
}

export async function fetchSquadsPages(query: string) {
  return 1; // como está mockado, só temos 1 página
}

export async function fetchSquadById(id: string) {
  return allSquads.find((s) => s.id === id) || null;
}
