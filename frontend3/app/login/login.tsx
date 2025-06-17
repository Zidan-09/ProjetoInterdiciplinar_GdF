import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.status) {
        const { role, token } = data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Redireciona com base no role
        router.push(`/${role}`);
      } else {
        setErrorMessage(data.message || 'Erro desconhecido');
      }
    } catch (err) {
      setErrorMessage('Erro de conexão com o servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 100 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Password:</label><br />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 10 }}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <button type="submit" style={{ marginTop: 20 }}>
          Entrar
        </button>

        {errorMessage && (
          <p style={{ color: 'red', marginTop: 10 }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}