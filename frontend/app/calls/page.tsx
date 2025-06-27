'use client';

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar, Clock } from "lucide-react";

interface Chamado {
  tipo: string;
  senha: string;
  nome: string;
  timestamp: Date;
}

export default function ChamadosPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [filaDeExibicao, setFilaDeExibicao] = useState<Chamado[]>([]);
  const [popupChamado, setPopupChamado] = useState<Chamado | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Conexão com WebSocket
  useEffect(() => {
    const socketInstance = io("http://localhost:3333");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("🔌 Conectado ao WebSocket");
    });

    const adicionarChamado = (data: { called: string; queue: string }) => {
      const novoChamado: Chamado = {
        tipo: data.queue,
        senha: data.called,
        nome: nomeFila(data.queue),
        timestamp: new Date(),
      };

      setFilaDeExibicao((prev) => [...prev, novoChamado]);
    };

    socketInstance.on("recep", adicionarChamado);
    socketInstance.on("triage", adicionarChamado);
    socketInstance.on("consult", adicionarChamado);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Exibir chamados sequencialmente
  useEffect(() => {
    if (!popupChamado && filaDeExibicao.length > 0) {
      const proximo = filaDeExibicao[0];
      setPopupChamado(proximo);
      setFilaDeExibicao((prev) => prev.slice(1));

      const tocarESpeak = async () => {
        try {
          const audio = new Audio("/chamado.mp3");

          // Espera o áudio terminar
          await new Promise<void>((resolve, reject) => {
            audio.onended = () => resolve();
            audio.onerror = () => reject("Erro ao carregar ou tocar o áudio.");
            audio.play().catch(reject);
          });

          // Depois do som, fala
          const fala = new SpeechSynthesisUtterance();
          fala.lang = 'pt-BR';
          fala.text = proximo.tipo === 'recep'
            ? `Senha ${proximo.senha}, dirigir-se à recepção.`
            : `${proximo.senha}, dirigir-se à ${proximo.nome.toLowerCase()}.`;

          await new Promise<void>((resolve) => {
            fala.onend = () => resolve();
            fala.onerror = () => resolve();
            speechSynthesis.speak(fala);
          });

          // Após a fala, limpa o card e adiciona ao histórico
          setChamados((prev) => [proximo, ...prev]);
          setTimeout(() => {
            setPopupChamado(null);
          }, 1000);
        } catch (err) {
          console.error("Erro no áudio ou fala:", err);
          setChamados((prev) => [proximo, ...prev]);
          setPopupChamado(null);
        }
      };

      tocarESpeak();
    }
  }, [popupChamado, filaDeExibicao]);

  const nomeFila = (queue: string) => {
    switch (queue) {
      case "recep": return "Recepção";
      case "triage": return "Triagem";
      case "consult": return "Consulta";
      default: return queue;
    }
  };

  const formatarData = (date: Date) => {
    return format(date, "HH:mm - dd/MM/yyyy", { locale: ptBR });
  };

  const isSenhaPadrao = (valor: string) => /^[NPV]\d{3}$/.test(valor);

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-center items-center">
          {popupChamado ? (
            <div className="bg-white rounded-lg shadow-md p-10 border-l-8 border-blue-500 w-[700px] h-[400px] flex flex-col justify-center items-center space-y-4 animate-fade-in">
              <h2
                className={`font-bold text-gray-800 animate-pulse ${
                  isSenhaPadrao(popupChamado.senha) ? "text-5xl" : "text-4xl"
                }`}
              >
                {popupChamado.nome}
              </h2>

              <p
                className={`font-extrabold text-blue-600 animate-pulse ${
                  isSenhaPadrao(popupChamado.senha) ? "text-8xl" : "text-4xl"
                }`}
              >
                {popupChamado.senha}
              </p>

              <p className="text-4xl text-gray-700 text-center">
                Por favor, dirigir-se à <strong>{popupChamado.nome}</strong>.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 w-full">
              <p className="text-gray-500 text-lg">Nenhum chamado ativo no momento.</p>
            </div>
          )}
        </div>

        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-verde">Histórico</h2>
          <div className="space-y-3">
            {chamados.slice(0, 3).map((c, index) => (
              <div key={index} className="border-b pb-2 last:border-b-0 text-verdeclaro">
                <p className="text-sm font-medium">{c.nome}: {c.senha}</p>
                <p className="text-xs text-gray-500">{formatarData(c.timestamp)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-verde text-white p-4 flex items-center justify-between h-20 overflow-hidden">
        <div className="flex items-center -space-x-5">
          <img src="/Gemini_Generated_Image_9357q79357q79357.png" alt="Logo" className="h-[100px] w-[120px] mt-3 -ml-3" />
          <span className="text-lg font-semibold leading-[1.2]">Sistema<br />GDF</span>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Calendar className="text-white w-5 h-5" />
            {hasMounted && (
              <p className="text-xl font-medium">
                {format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-white w-5 h-5" />
            {hasMounted && (
              <p className="text-2xl font-bold">
                {format(currentTime, "HH:mm:ss", { locale: ptBR })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
