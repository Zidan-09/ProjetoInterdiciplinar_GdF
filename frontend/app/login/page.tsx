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

      const loginValido =
        data.status === true ||
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
     <div className="relative min-h-screen flex items-center justify-center w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed blur-[2px]"
          style={{ 
          backgroundImage: "url('/AlbedoBase_XL_abstract_background_with_light_bluelight_aqua_gr_3.jpg')"
        }}
      />

      <div className="bg-white/20 p-8 rounded-lg shadow-lg w-full max-w-md 
                  backdrop-blur-md border border-white/30">
          
        <h2 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-md">Login do Funcionário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuário:
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-full border-2 border-white/30 
             bg-transparent text-black placeholder-gray-600/80 
             focus:outline-none focus:border-white/80 focus:ring-2 
             focus:ring-white/30 transition-all backdrop-blur-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-full border-2 border-white/30 
             bg-transparent text-black placeholder-gray-600/80 
             focus:outline-none focus:border-white/80 focus:ring-2 
             focus:ring-white/30 transition-all backdrop-blur-sm"
            />
          </div>
           <div className="mt-6"></div>
          <button
            type="submit"
            className="w-full bg-verde text-white py-4 px-4 rounded-full hover:bg-verdeclaro transition mt-8 shadow-md"
          >
            Entrar
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-400 rounded p-3 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
