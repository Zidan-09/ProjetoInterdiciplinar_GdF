'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3333/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.status) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('role', data.data.role);

        switch (data.data.role.toLowerCase()) {
          case 'admin':
            router.push('/admin');
            break;
          case 'receptionist':
            router.push('/receptionist');
            break;
          default:
            setError(`Função não reconhecida: ${data.data.role}`);
        }
      } else {
        setError(data.message || 'Erro desconhecido');
      }
    } catch {
      setError('Erro ao conectar com a API.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Login do Funcionário</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Usuário:</label>
        <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="password">Senha:</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Entrar</button>
      </form>
      {error && <div style={{ marginTop: '20px', color: '#842029', background: '#f8d7da', padding: '10px' }}>{error}</div>}
    </div>
  );
}