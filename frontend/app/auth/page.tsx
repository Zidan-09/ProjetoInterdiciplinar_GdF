// app/confirm/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface DecodedToken {
  [key: string]: any;
}

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3333/employee/authAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: token,
          user: {
            username,
            password,
          },
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setError("");
      } else {
        const err = await res.json();
        setError(err.message || "Erro na autenticação.");
      }
    } catch (err) {
      setError("Erro ao conectar com a API.");
    }
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">Usuário autenticado com sucesso!</h1>
        <a href="/" className="text-blue-600 underline mt-4 block">Ir para a página principal</a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Criar usuário</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Autenticar
        </button>
      </form>
    </div>
  );
}