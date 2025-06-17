'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3333/employee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      const loginValido = data.status === true ||
        (data.message === 'employee_logged_in' &&
         data.data?.token &&
         data.data?.role);

      if (loginValido) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('role', data.data.role);

        switch (data.data.role.toLowerCase()) {
          case 'admin':
            router.push('/admin');
            break;
          case 'receptionist':
            router.push('/receptionist');
            break;
          case 'doctor':
            router.push('/doctor');
            break;
          case 'nurse':
            router.push('/nurse');
            break;
          default:
            setError(`Função não reconhecida: ${data.data.role}`);
        }
      } else {
        setError(data.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao conectar com a API.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Login do Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário:</label>
        <input
          type="text"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      {error && (
        <div
          id="resultado"
          style={{
            marginTop: '20px',
            whiteSpace: 'pre-wrap',
            background: '#f8d7da',
            color: '#842029',
            padding: '10px',
            border: '1px solid #f5c2c7',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
