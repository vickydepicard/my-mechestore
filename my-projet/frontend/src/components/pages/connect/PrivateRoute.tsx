import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext"; // 🔄 Utilise le contexte d'authentification

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté, on le redirige vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
