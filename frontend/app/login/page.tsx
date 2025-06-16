// pages/login.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../utils/api';
import { saveToken } from '../../utils/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(username, password);
      console.log(response);
      if (response.status) {
        console.log("Login OK:", response.data);
        saveToken(response.data.token);
        const role = response.data.role.toLowerCase(); // lowercase para prevenir bugs
        router.push(`/${role}`);
      } else {
        alert(response.message || 'Erro ao fazer login');
      }
    } catch (error) {
      alert('Erro na requisição. Verifique a API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10rem' }}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </main>
  );
}

// 'use client'
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(username, password);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="text-black border p-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="text-black border p-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// }

// 'use client';

// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import api from '../../utils/api'
// interface AuthContextType {
//   role: string | null;
//   token: string | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [role, setRole] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const router = useRouter();

//   const login = async (username: string, password: string) => {
//     try {
//       const res = await api.post('/employee/login', { username, password });

//       if (res.data.status) {
//         const userRole = res.data.data.role.accessLevel;
//         const userToken = res.data.data.token;

//         setRole(userRole);
//         setToken(userToken);

//         // Salvar o token no localStorage para usar depois nas requisições protegidas
//         localStorage.setItem('token', userToken);

//         if (userRole === 'admin') {
//           router.push('/admin');
//         } else if (userRole === 'receptionist') {
//           router.push('/receptionist');
//         } else {
//           router.push('/');
//         }
//       } else {
//         alert('Login inválido');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Erro ao fazer login');
//     }
//   };

//   const logout = () => {
//     setRole(null);
//     setToken(null);
//     localStorage.removeItem('token');
//     router.push('/');
//   };

//   return (
//     <AuthContext.Provider value={{ role, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
//   return context;
// };
///////////////////////////////////////////////////
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { login } from '@/services/auth'; // ajuste o caminho se necessário

// export default function LoginPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!username.trim() || !password.trim()) {
//       setError('Preencha todos os campos.');
//       return;
//     }

//     try {
//       const { user, token, role } = await login(username, password);
//       console.log('Logado como:', user, role);

//       localStorage.setItem('token',token);
//       localStorage.setItem('accessLevel',role.toLowerCase());  


//       console.log("Redirecionando para:", role);
//       switch (role.toLowerCase()) {
//         case 'admin':
//           router.push('/admin');
//           break;
//         case 'receptionist':
//           router.push('/receptionist');
//           break;
//         default:
//           setError('Nível de acesso desconhecido');
//       }

//     } catch (err) {
//       console.error(err);
//       setError('Usuário ou senha inválidos');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl mb-6 text-center font-bold text-blue-800">Login no Sistema UBS</h2>

//         <input
//           type="text"
//           placeholder="Usuário"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="text-black w-full p-2 mb-4 border border-gray-300 rounded"
//           required
//         />

//         <div className="relative mb-4">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Senha"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="text-black w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
//           >
//             {showPassword ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//             )}
//           </button>
//         </div>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// }

// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function LoginPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Validação local
//     if (!username.trim() || !password.trim()) {
//       setError('Preencha todos os campos.');
//       return;
//     }

//     try {
//       console.log("Enviando para login:", { username, password });

//       const res = await axios.post('http://localhost:3333/employee/login', {
//         username,
//         password,
//       });
//       console.log('reposta',res.data);
//       const { user, token, role } = res.data;
//       console.log(user, token, role);

//       localStorage.setItem('token', token);
//       localStorage.setItem('username', user);
//       localStorage.setItem('accessLevel', role);

//       switch (role) {
//         case 'admin':
//           router.push('/admin');
//           break;
//         case 'receptionist':
//           router.push('/receptionist');
//           break;
//         default:
//           setError('Nível de acesso desconhecido');
//       }

//     } catch (err: any) {
//       console.error(err);
//       setError('Usuário ou senha inválidos');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl mb-6 text-center font-bold text-blue-800">Login no Sistema UBS</h2>

//         <input
//           type="text"
//           placeholder="Usuário"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="text-black w-full p-2 mb-4 border border-gray-300 rounded"
//           required
//         />

//         <div className="relative mb-4">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Senha"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="text-black w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
//           >
//             {showPassword ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//             )}
//           </button>
//         </div>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// }
