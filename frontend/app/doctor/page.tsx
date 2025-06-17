'use client';
import { useAuth } from '../utils/authRedirect';

export default function DoctorPage() {
  useAuth('doctor');

  return <h1>Bem-vindo ao Painel da Gokuzão</h1>;
}
