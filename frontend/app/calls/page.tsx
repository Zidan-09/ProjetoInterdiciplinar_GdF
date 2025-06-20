"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Chamado {
  tipo: string;   // Fila: recep, triage, consult
  senha: string;  // Pode ser ticket, nome ou ID
  nome: string;   // Nome da fila, para exibição
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

    const adicionarChamado = (data: { called: string; queue: string }) => {
      setChamados((prev) => [
        {
          tipo: data.queue,
          senha: data.called,
          nome: nomeFila(data.queue),
        },
        ...prev,
      ]);
    };

    // Escuta os três tipos de eventos
    socketInstance.on("recep", adicionarChamado);
    socketInstance.on("triage", adicionarChamado);
    socketInstance.on("consult", adicionarChamado);

    socketInstance.on("disconnect", () => {
      console.warn("❌ Desconectado do WebSocket");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Função para transformar o nome técnico da fila em algo mais legível
  const nomeFila = (queue: string) => {
    switch (queue) {
      case "recep":
        return "Recepção";
      case "triage":
        return "Triagem";
      case "consult":
        return "Consulta";
      default:
        return queue;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Chamados em tempo real</h1>
      {chamados.length === 0 ? (
        <p className="text-gray-500">Nenhum chamado recebido ainda.</p>
      ) : (
        <ul className="space-y-2">
          {chamados.map((c, index) => (
            <li key={index} className="border rounded p-3 shadow-sm bg-white">
              <p><strong>Fila:</strong> {c.nome}</p>
              <p><strong>Chamada:</strong> {c.senha}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}