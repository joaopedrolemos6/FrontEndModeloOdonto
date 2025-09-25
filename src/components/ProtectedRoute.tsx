// src/components/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // 1. Enquanto o estado de autenticação estiver carregando, exibe uma mensagem.
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // 2. Após o carregamento, se não estiver autenticado OU o objeto user for nulo, redireciona para o login.
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se a rota exige uma role específica e o usuário não a possui, redireciona para a home.
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 4. Se todas as verificações passarem, renderiza a página solicitada.
  return <Outlet />;
};