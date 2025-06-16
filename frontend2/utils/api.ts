// utils/api.ts

import { getToken } from './auth';

const BASE_URL = 'http://localhost:3333'; // substitua pela URL real

export async function login(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/employee/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { status: false, message: error.message };
  }

  const data = await response.json();
  return data;
}

// Exemplo de chamada autenticada futura
export async function getProtectedData() {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/alguma-rota-protegida`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}