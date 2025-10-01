// src/pages/Login.tsx

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Navigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Este efeito será executado sempre que o estado de autenticação mudar
    if (!isLoading && isAuthenticated) {
      // Se o carregamento terminou e o usuário está autenticado, redireciona
      if (user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true }); // Redireciona pacientes para a home
      }
    }
  }, [isAuthenticated, isLoading, user, navigate]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await login(data);
      // O redirecionamento agora é tratado pelo useEffect acima
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Falha no login", error);
      toast.error("Email ou senha incorretos!");
    }
  };

  // Enquanto carrega, não mostra nada para evitar "piscar" a tela de login
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  // Se já estiver logado (após o carregamento), não renderiza o formulário
  // O useEffect acima cuidará do redirecionamento
  if (isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
          <CardDescription>Entre com suas credenciais de administrador.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}