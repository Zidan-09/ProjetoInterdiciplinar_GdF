import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: any;

export default function CallsPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Conecta ao socket
    socket = io('http://localhost:3333');

    // Ouve eventos
    socket.on('new_call', (data: any) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Chamados em Tempo Real</h1>
      {messages.length === 0 ? (
        <p>Nenhum chamado recebido ainda.</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <pre>{JSON.stringify(msg, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}