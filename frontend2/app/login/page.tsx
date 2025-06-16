// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/api';
import { saveToken } from '../utils/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(username, password);

      if (response.status) {
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