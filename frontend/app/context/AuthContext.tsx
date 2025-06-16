'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';

interface AuthContextType {
  role: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Carregar o token do localStorage ao abrir o site (para não perder o login após refresh)
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post('/employee/login', { username, password });

      if (res.data.status) {
        const userRole = res.data.data.role.accessLevel;
        const userToken = res.data.data.token;

        setRole(userRole);
        setToken(userToken);

        localStorage.setItem('token', userToken);
        localStorage.setItem('role', userRole);

        // Redireciona baseado no role
        if (userRole === 'admin') {
          router.push('/admin');
        } else if (userRole === 'nurse') {
          router.push('/nurse');
        } else {
          router.push('/');
        }
      } else {
        alert('Login inválido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};