'use client';
import { useAuth } from '../utils/authRedirect';

export default function ReceptionistPage() {
  useAuth('receptionist');

  return <h1>Bem-vindo ao Painel da Recepção</h1>;
}
