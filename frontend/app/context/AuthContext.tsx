'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  token: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3333/employee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await res.json();

      if (data.status && data.data) {
        setUser(data.data.user);
        setToken(data.data.token);
        setRole(data.data.role);

        // Redirecionamento baseado no role
        if (data.data.role === 'admin') {
          router.push('/admin');
        } else if (data.data.role === 'receptionist') {
          router.push('/receptionist');
        } else if (data.data.role === 'nurse') {
          router.push('/nurse');
        } else {
          router.push('/not-found');
        }
      } else {
        alert('Login inválido!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
