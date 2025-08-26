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

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});

const registerSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
  secretKey: z.string().min(6, "Chave obrigatória"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AdminAuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nome: "", email: "", password: "", secretKey: "" },
  });

  const extractMessage = (data: any) => {
    if (!data) return "Erro desconhecido";
    if (typeof data.message === "string") return data.message;
    if (Array.isArray(data.message)) return data.message.join(", ");
    return "Erro desconhecido";
  };

  const handleLogin = async (values: LoginForm) => {
    setLoading(true);
    loginForm.clearErrors(["email", "password"]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      const msg = extractMessage(data);

      if (!res.ok) {
        if (msg.includes("Email")) {
          loginForm.setError("email", { type: "manual", message: msg });
        } else if (msg.includes("Senha")) {
          loginForm.setError("password", { type: "manual", message: msg });
        } else {
          toast.error(msg);
        }
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

  const handleRegister = async (values: RegisterForm) => {
    setLoading(true);
    registerForm.clearErrors(["email", "password", "secretKey"]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      const msg = extractMessage(data);

      if (!res.ok) {
        if (msg.includes("email")) {
          registerForm.setError("email", { type: "manual", message: msg });
        } else if (msg.includes("senha")) {
          registerForm.setError("password", { type: "manual", message: msg });
        } else if (msg.includes("Chave")) {
          registerForm.setError("secretKey", { type: "manual", message: msg });
        } else {
          toast.error(msg);
        }
        return;
      }

      toast.success("Administrador cadastrado com sucesso!");
      registerForm.reset();
    } catch (err: any) {
      toast.error(err.message || "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[420px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-500">
            Administração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastrar Admin</TabsTrigger>
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
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            {/* Cadastro Admin */}
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input {...registerForm.register("nome")} placeholder="Seu nome" />
                  {registerForm.formState.errors.nome && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.nome?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...registerForm.register("email")} placeholder="admin@email.com" />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.email?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" {...registerForm.register("password")} placeholder="********" />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.password?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Chave de Autorização</Label>
                  <Input type="password" {...registerForm.register("secretKey")} placeholder="********" />
                  {registerForm.formState.errors.secretKey && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.secretKey?.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Cadastrando..." : "Cadastrar Admin"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
