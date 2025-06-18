'use client';
import { useAuth } from '../utils/authRedirect';
import RegisterForm from './components/registerForm';

export default function AdminPage() {
  useAuth('admin');

  return (
    <div className='p-6'>
      <h1>Bem-vindo ao Painel do Administrador</h1>
      <h2 className='text-xl font-bold mb-4'>Painel do admin</h2>
      <RegisterForm/>
    </div>
  );
}
