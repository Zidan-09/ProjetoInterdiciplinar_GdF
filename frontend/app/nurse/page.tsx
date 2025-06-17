'use client';
import { useAuth } from '../utils/authRedirect';

export default function DoctorPage() {
  useAuth('nurse');

  return <h1>Bem-vindo ao Painel da Mãe do Trunks</h1>;
}
