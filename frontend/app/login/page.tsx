'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth'; // usa sua função login já pronta

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const accessLevel = localStorage.getItem('accessLevel');

    if (token && accessLevel) {
      if (accessLevel === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/receptionist');
      }
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const accessLevel = await login(username, password); // usa a função da service
      if (accessLevel === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/receptionist');
      }
    } catch (err) {
      alert('Credenciais inválidas ou erro de conexão.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        className="text-black w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="text-black w-full mb-4 p-2 border rounded"
        required
      />

      <button className="bg-blue-600 text-white w-full p-2 rounded">Entrar</button>
    </form>
  );
}
