const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || `Falha na requisição: ${res.statusText}`);
  }

  return res.json();
};

/* =============================
   Ações para Alunos
============================= */
export const createAluno = (alunoData: { nome: string; email: string }) => {
  return fetchWithAuth(`${API_BASE_URL}/alunos`, {
    method: "POST",
    body: JSON.stringify(alunoData),
  });
};

export const getAlunos = () => {
  return fetchWithAuth(`${API_BASE_URL}/alunos`);
};

export const updateAluno = (
  id: string,
  alunoData: { nome?: string; email?: string }
) => {
  return fetchWithAuth(`${API_BASE_URL}/alunos/${id}`, {
    method: "PUT",
    body: JSON.stringify(alunoData),
  });
};

export const deleteAluno = (id: string) => {
  return fetchWithAuth(`${API_BASE_URL}/alunos/${id}`, { method: "DELETE" });
};

/* =============================
   Ações para Turmas
============================= */
export const createTurma = (turmaData: { nome: string }) => {
  return fetchWithAuth(`${API_BASE_URL}/turmas`, {
    method: "POST",
    body: JSON.stringify(turmaData),
  });
};

export const getTurmas = () => {
  return fetchWithAuth(`${API_BASE_URL}/turmas`);
};

export const updateTurma = (id: string, turmaData: { nome?: string }) => {
  return fetchWithAuth(`${API_BASE_URL}/turmas/${id}`, {
    method: "PUT",
    body: JSON.stringify(turmaData),
  });
};

export const deleteTurma = (id: string) => {
  return fetchWithAuth(`${API_BASE_URL}/turmas/${id}`, { method: "DELETE" });
};

/* =============================
   Ações para Squads
============================= */
export const createSquad = (squadData: { nome: string; turma?: string }) => {
  return fetchWithAuth(`${API_BASE_URL}/squads`, {
    method: "POST",
    body: JSON.stringify(squadData),
  });
};

export const getSquads = () => {
  return fetchWithAuth(`${API_BASE_URL}/squads`);
};

export const updateSquad = (
  id: string,
  squadData: { nome?: string; turma?: string }
) => {
  return fetchWithAuth(`${API_BASE_URL}/squads/${id}`, {
    method: "PUT",
    body: JSON.stringify(squadData),
  });
};

export const deleteSquad = (id: string) => {
  return fetchWithAuth(`${API_BASE_URL}/squads/${id}`, { method: "DELETE" });
};
