"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  turma_id: z.string().min(1, { message: "Turma é obrigatória" }),
  squad_id: z.string().optional(),
});

const CreateAluno = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    nome?: string[];
    email?: string[];
    turma_id?: string[];
    squad_id?: string[];
  };
  message?: string | null;
};

export async function createAluno(prevState: State, formData: FormData) {
  const validatedFields = CreateAluno.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    turma_id: formData.get("turma_id"),
    squad_id: formData.get("squad_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltando. Falha ao criar Aluno.",
    };
  }

  const { nome, email, turma_id, squad_id } = validatedFields.data;

  try {
    console.log("Criando aluno:", { nome, email, turma_id, squad_id });
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao criar Aluno.",
    };
  }

  revalidatePath("/dashboard/alunos");
  redirect("/dashboard/alunos");
}

export async function updateAluno(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreateAluno.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    turma_id: formData.get("turma_id"),
    squad_id: formData.get("squad_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltando. Falha ao atualizar Aluno.",
    };
  }

  const { nome, email, turma_id, squad_id } = validatedFields.data;

  try {
    console.log("Atualizando aluno:", id, { nome, email, turma_id, squad_id });
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao atualizar Aluno.",
    };
  }

  revalidatePath("/dashboard/alunos");
  redirect("/dashboard/alunos");
}
