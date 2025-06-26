'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3333/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      {/* Fundo com imagem e blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed blur-[2px]"
        style={{ backgroundImage: "url('/v870-tang-36.jpg')" }}
      />

      {/* Card de login */}
      <div className="bg-white/20 p-10 rounded-[40px] shadow-lg w-full max-w-sm backdrop-blur-md border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-2 text-verde">REALIZE SEU LOGIN</h2>
        <p className="text-xl text-center text-white mt-1 mb-3 font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Insira seu Usuário e Senha</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuário */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="w-full px-4 py-3 rounded-full border-2 border-white/30 
              bg-white text-black placeholder-gray-600/80 
              focus:outline-none focus:border-white/80 focus:ring-2 
              focus:ring-white/30 transition-all backdrop-blur-sm"
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="pr-10 w-full px-4 py-3 rounded-full border-2 border-white/30 
              bg-white text-black placeholder-gray-600/80 
              focus:outline-none focus:border-white/80 focus:ring-2 
              focus:ring-white/30 transition-all backdrop-blur-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Botão */}
          <div className="mt-6"></div>
          <button
            type="submit"
            className="w-full bg-verde text-white py-4 px-4 rounded-full hover:bg-verdeclaro transition mt-8 shadow-md"
          >
            Entrar &gt;
          </button>
        </form>

        {/* Erro */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-400 rounded p-3 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
