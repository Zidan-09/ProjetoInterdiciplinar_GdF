'use client';

import { useEffect, useState, useRef } from "react";
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
  const [isClient, setIsClient] = useState(false);
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [popupChamado, setPopupChamado] = useState<Chamado | null>(null);
  const [filaDeExibicao, setFilaDeExibicao] = useState<Chamado[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const socketInstance = io("http://localhost:3333");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("🔌 Conectado ao WebSocket");
    });

    const adicionarChamado = (data: { called: string; queue: string }) => {
      const novoChamado = {
        tipo: data.queue,
        senha: data.called,
        nome: nomeFila(data.queue),
        timestamp: new Date(),
      };
      setChamados((prev) => [novoChamado, ...prev]);
      setFilaDeExibicao((prev) => [...prev, novoChamado]);
    };

    socketInstance.on("recep", adicionarChamado);
    socketInstance.on("triage", adicionarChamado);
    socketInstance.on("consult", adicionarChamado);

    return () => {
      socketInstance.disconnect();
    };
  }, [isClient]);

  useEffect(() => {
    if (!popupChamado && filaDeExibicao.length > 0) {
      const proximo = filaDeExibicao[0];
      setPopupChamado(proximo);
      setFilaDeExibicao((prev) => prev.slice(1));

      const fala = new SpeechSynthesisUtterance();
      fala.lang = 'pt-BR';
      if (proximo.tipo === 'recep') {
        fala.text = `Senha ${proximo.senha}, dirigir-se à recepção.`;
      } else {
        fala.text = `${proximo.nome}, dirigir-se à ${nomeFila(proximo.tipo).toLowerCase()}.`;
      }
      speechSynthesis.speak(fala);

      setTimeout(() => {
        setPopupChamado(null);
      }, 5000);
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

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      {popupChamado && (
        <div className="absolute z-50 top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white p-8 rounded-xl shadow-lg animate-pulse w-[500px]">
          <h2 className="text-3xl font-bold mb-2">{popupChamado.nome}</h2>
          <p className="text-5xl font-extrabold mb-1">{popupChamado.senha}</p>
          <p className="text-lg">Por favor, dirigir-se à <strong>{popupChamado.nome}</strong>.</p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-verde">CHAMADOS ATIVOS</h1>
          {chamados.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 text-lg">Nenhum chamado recebido ainda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chamados.map((c, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{c.nome}</h3>
                      <p className="text-2xl font-bold text-blue-600">{c.senha}</p>
                    </div>
                    <span className="text-sm text-gray-500">{formatarData(c.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-verde">Histórico</h2>
          <div className="space-y-3">
            {chamados.slice(0, 10).map((c, index) => (
              <div key={index} className="border-b pb-2 last:border-b-0">
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
          {/* Data com ícone de calendário */}
          <div className="flex items-center gap-2">
            <Calendar className="text-white w-5 h-5" />
            <p className="text-xl font-medium">
              {format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
          
         
        <div className="flex items-center gap-2">
          <Clock className="text-white w-5 h-5" />
          <p className="text-2xl font-bold">
            {format(currentTime, "HH:mm:ss", { locale: ptBR })}
          </p>
        </div>
        </div>
        </div>
        </div>
  );
}



// 'use client';

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale/pt-BR";

// interface Chamado {
//   tipo: string;
//   senha: string;
//   nome: string;
//   timestamp: Date;
// }

// export default function ChamadosPage() {
//   const [isClient, setIsClient] = useState(false);
//   const [chamados, setChamados] = useState<Chamado[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Efeito para verificar se está no client-side e iniciar timer
//   useEffect(() => {
//     setIsClient(true);
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Conexão com o WebSocket
//   useEffect(() => {
//     if (!isClient) return;

//     const socketInstance = io("http://localhost:3333");
//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("🔌 Conectado ao WebSocket");
//     });

//     const adicionarChamado = (data: { called: string; queue: string }) => {
//       setChamados((prev) => [
//         {
//           tipo: data.queue,
//           senha: data.called,
//           nome: nomeFila(data.queue),
//           timestamp: new Date(),
//         },
//         ...prev,
//       ]);
//     };

//     socketInstance.on("recep", adicionarChamado);
//     socketInstance.on("triage", adicionarChamado);
//     socketInstance.on("consult", adicionarChamado);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [isClient]);

//   const nomeFila = (queue: string) => {
//     switch (queue) {
//       case "recep": return "Recepção";
//       case "triage": return "Triagem";
//       case "consult": return "Consulta";
//       default: return queue;
//     }
//   };

//   const formatarData = (date: Date) => {
//     return format(date, "HH:mm - dd/MM/yyyy", { locale: ptBR });
//   };

//   if (!isClient) {
//     return (
//       <div className="flex flex-col h-screen bg-gray-100">
//         <div className="flex-1 flex items-center justify-center">
//           <p>Carregando...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Container principal */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Área principal de chamados */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           <h1 className="text-3xl font-bold mb-6 text-verde">CHAMADOS ATIVOS</h1>
          
//           {chamados.length === 0 ? (
//             <div className="flex items-center justify-center h-64">
//               <p className="text-gray-500 text-lg">Nenhum chamado recebido ainda.</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {chamados.map((c, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-800">{c.nome}</h3>
//                       <p className="text-2xl font-bold text-blue-600">{c.senha}</p>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       {formatarData(c.timestamp)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Barra de histórico */}
//         <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
//           <h2 className="text-xl font-bold mb-4 text-verde">Histórico</h2>
//           <div className="space-y-3">
//             {chamados.slice(0, 10).map((c, index) => (
//               <div key={index} className="border-b pb-2 last:border-b-0">
//                 <p className="text-sm font-medium">{c.nome}: {c.senha}</p>
//                 <p className="text-xs text-gray-500">{formatarData(c.timestamp)}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-verde text-white p-4 flex items-center justify-between h-20 overflow-hidden">
//       <div className="flex items-center -space-x-5">
//         <img 
//           src="/Gemini_Generated_Image_9357q79357q79357.png" 
//           alt="Logo" 
//           className="h-[100px] w-[120px] mt-3 -ml-3" 
//         />
//         <span className="text-lg font-semibold leading-[1.2]">Sistema<br />GDF</span>
//       </div>

//       <div className="text-right">
//         <p className="text-xl font-medium">
//           {format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
//         </p>
//         <p className="text-2xl font-bold">
//           {format(currentTime, "HH:mm:ss", { locale: ptBR })}
//         </p>
//       </div>
//     </div>
//   </div>
// );
// }
// Quando um chamado for realizado, deve-se exibir como pop up de celular, ou seja, o chamado aparece na tela, é exibido durante 5 segundos e sai para o histórico;
// Caso aconteça 2 chamados ao mesmo tempo, o que apareceu primeiro deve ser exibido e o próximo deve esperar o primeiro teminar a exibição (5 segundos)





// "use client";

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface Chamado {
//   tipo: string;   // Fila: recep, triage, consult
//   senha: string;  // Pode ser ticket, nome ou ID
//   nome: string;   // Nome da fila, para exibição
// }

// export default function ChamadosPage() {
//   const [chamados, setChamados] = useState<Chamado[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io("http://localhost:3333");
//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("🔌 Conectado ao WebSocket");
//     });

//     const adicionarChamado = (data: { called: string; queue: string }) => {
//       setChamados((prev) => [
//         {
//           tipo: data.queue,
//           senha: data.called,
//           nome: nomeFila(data.queue),
//         },
//         ...prev,
//       ]);
//     };

//     // Escuta os três tipos de eventos
//     socketInstance.on("recep", adicionarChamado);
//     socketInstance.on("triage", adicionarChamado);
//     socketInstance.on("consult", adicionarChamado);

//     socketInstance.on("disconnect", () => {
//       console.warn("❌ Desconectado do WebSocket");
//     });

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   const nomeFila = (queue: string) => {
//     switch (queue) {
//       case "recep":
//         return "Recepção";
//       case "triage":
//         return "Triagem";
//       case "consult":
//         return "Consulta";
//       default:
//         return queue;
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4">
//       <h1 className="text-2xl font-bold mb-4">Chamados em tempo real</h1>
//       {chamados.length === 0 ? (
//         <p className="text-gray-500">Nenhum chamado recebido ainda.</p>
//       ) : (
//         <ul className="space-y-2">
//           {chamados.map((c, index) => (
//             <li key={index} className="border rounded p-3 shadow-sm bg-white">
//               <p><strong>Fila:</strong> {c.nome}</p>
//               <p><strong>Chamada:</strong> {c.senha}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }