"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/app/context/auth";

// Schemas
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});

const registerAdminSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
  secretKey: z.string().min(6, "Chave obrigatória"),
});

const registerUserSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
  turmaId: z.string().optional(),
  squadId: z.string().optional(),
});

// Types
type LoginForm = z.infer<typeof loginSchema>;
type RegisterAdminForm = z.infer<typeof registerAdminSchema>;
type RegisterUserForm = z.infer<typeof registerUserSchema>;

export default function AdminAuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Forms
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerAdminForm = useForm<RegisterAdminForm>({
    resolver: zodResolver(registerAdminSchema),
    defaultValues: { nome: "", email: "", password: "", secretKey: "" },
  });

  const registerUserForm = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: { nome: "", email: "", password: "", turmaId: "", squadId: "" },
  });

  // Handlers
  const handleLogin = async (values: LoginForm) => {
    setLoading(true);
    loginForm.clearErrors();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Email não encontrado") loginForm.setError("email", { type: "manual", message: data.message });
        else if (data.message === "Senha incorreta") loginForm.setError("password", { type: "manual", message: data.message });
        else toast.error(data.message || "Falha no login");
        return;
      }

      login(data.access_token, data.user);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAdmin = async (values: RegisterAdminForm) => {
    setLoading(true);
    registerAdminForm.clearErrors();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("email")) registerAdminForm.setError("email", { type: "manual", message: data.message });
        else if (data.message?.includes("senha")) registerAdminForm.setError("password", { type: "manual", message: data.message });
        else if (data.message?.includes("Chave")) registerAdminForm.setError("secretKey", { type: "manual", message: data.message });
        else toast.error(data.message || "Falha no cadastro");
        return;
      }

      toast.success("Administrador cadastrado com sucesso!");
      registerAdminForm.reset();
    } catch (err: any) {
      toast.error(err.message || "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterUser = async (values: RegisterUserForm) => {
    setLoading(true);
    registerUserForm.clearErrors();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Falha no cadastro");
        return;
      }

      toast.success("Usuário registrado com sucesso!");
      registerUserForm.reset();
    } catch (err: any) {
      toast.error(err.message || "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  };

  // JSX
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[420px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-500">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register-admin">Cadastrar Admin</TabsTrigger>
              <TabsTrigger value="register-user">Cadastrar Usuário</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...loginForm.register("email")} placeholder="seu@email.com" />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.email?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" {...loginForm.register("password")} placeholder="********" />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.password?.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            {/* Cadastro Admin */}
            <TabsContent value="register-admin">
              <form onSubmit={registerAdminForm.handleSubmit(handleRegisterAdmin)} className="space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input {...registerAdminForm.register("nome")} placeholder="Seu nome" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...registerAdminForm.register("email")} placeholder="admin@email.com" />
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" {...registerAdminForm.register("password")} placeholder="********" />
                </div>
                <div>
                  <Label>Chave de Autorização</Label>
                  <Input type="password" {...registerAdminForm.register("secretKey")} placeholder="********" />
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar Admin"}
                </Button>
              </form>
            </TabsContent>

            {/* Cadastro Usuário Comum */}
            <TabsContent value="register-user">
              <form onSubmit={registerUserForm.handleSubmit(handleRegisterUser)} className="space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input {...registerUserForm.register("nome")} placeholder="Seu nome" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...registerUserForm.register("email")} placeholder="usuario@email.com" />
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" {...registerUserForm.register("password")} placeholder="********" />
                </div>
                <div>
                  <Label>ID da Turma</Label>
                  <Input {...registerUserForm.register("turmaId")} placeholder="opcional" />
                </div>
                <div>
                  <Label>ID do Squad</Label>
                  <Input {...registerUserForm.register("squadId")} placeholder="opcional" />
                </div>
                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar Usuário"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
