'use client';
import { useAuth } from '../utils/authRedirect';

export default function AdminPage() {
  useAuth('admin');

  return <h1>Bem-vindo ao Painel do Administrador</h1>;
}
