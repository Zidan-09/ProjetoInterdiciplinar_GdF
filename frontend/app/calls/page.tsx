"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Chamado {
  tipo: string;
  senha: string;
  nome: string;
}

export default function ChamadosPage() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3333");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("🔌 Conectado ao WebSocket");
    });

    socketInstance.on("chamado", (data: Chamado) => {
      setChamados((prev) => [data, ...prev]);
    });

    socketInstance.on("disconnect", () => {
      console.warn("❌ Desconectado do WebSocket");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Chamados em tempo real</h1>
      {chamados.length === 0 ? (
        <p className="text-gray-500">Nenhum chamado recebido ainda.</p>
      ) : (
        <ul className="space-y-2">
          {chamados.map((c, index) => (
            <li
              key={index}
              className="border rounded p-3 shadow-sm bg-white"
            >
              <p><strong>Fila:</strong> {c.tipo}</p>
              <p><strong>Senha:</strong> {c.senha}</p>
              <p><strong>Paciente:</strong> {c.nome}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}