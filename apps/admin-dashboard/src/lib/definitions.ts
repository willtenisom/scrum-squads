export type Turma = {
  _id: string;
  nome: string;
};

export type Squad = {
  _id: string;
  nome: string;
  alunos: Aluno[];
};

export type Aluno = {
  _id: string;
  nome: string;
  email: string;
  turmaId?: string;
  turma?: Turma;
};
