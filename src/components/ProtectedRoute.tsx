import React, { ReactNode } from 'react';
import { useUserStore } from '../store/useUserStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
