'use client';

import { useAuth } from '../utils/authRedirect';
import { useEffect, useState } from 'react';
import PatientRegisterForm from './components/patientRegister';

export default function ReceptionistPage() {
  useAuth('receptionist');

  const [showForm, setShowForm] = useState(false);
  const [ticketPriority, setTicketPriority] = useState<number | null>(null);
  const [queue, setQueue] = useState<string[]>([]);
  const [calledTicket, setCalledTicket] = useState<string | null>(null);
  const [calledHistory, setCalledHistory] = useState<string[]>([]);


  const toggleForm = () => setShowForm((prev) => !prev);

  const handleTicketPriorityChange = (priority: number) => {
    setTicketPriority(priority);
  };

  const fetchQueue = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3333/queue/byName/recep', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (result.status && result.data) {
        setQueue(result.data);
      }
    } catch (err) {
      console.error('Erro ao buscar fila:', err);
    }
  };

  const callNextTicket = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3333/queue/call/recep', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result.status && result.data) {
        setCalledTicket(result.data);
        setCalledHistory((prev)=>[...prev,result.data]);
        fetchQueue(); // Atualiza a fila após chamada
      } else {
        setCalledTicket(null);
        alert("A fila esta vazia")
      }
    } catch (err) {
      console.error('Erro ao chamar próxima senha:', err);
      alert("Erro ao chamar proxima senha")
    }
  };

  const generateTicket = async () => {
    if (ticketPriority === null) {
      alert('Por favor, selecione uma prioridade para o ticket.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3333/hospital/ticket/${ticketPriority}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await response.json();
      console.log('Resposta da API:', result);

      if (result.status && result.data) {
        alert(`Senha gerada com sucesso! Senha: ${result.data}`);
        fetchQueue(); // Atualiza fila após gerar senha
      } else {
        alert(`Erro ao gerar a senha: ${result.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem('calledHistory');
    if (storedHistory) {
      setCalledHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calledHistory', JSON.stringify(calledHistory));
  }, [calledHistory]);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel da Recepção</h1>

      {/* Cadastro de Paciente */}
      <button
        onClick={toggleForm}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Fechar Cadastro' : 'Cadastrar Novo Paciente'}
      </button>

      {showForm && (
        <div className="mt-4">
          <PatientRegisterForm />
        </div>
      )}

      {/* Geração de Senha */}
      <h2 className="text-xl mt-6 mb-2">Gerar Senha de Atendimento</h2>

      <div className="space-x-4 mb-4">
        <button
          onClick={() => handleTicketPriorityChange(1)}
          className={`px-4 py-2 rounded ${
            ticketPriority === 1 ? 'bg-gray-500 text-white' : 'bg-gray-300'
          }`}
        >
          Sem Prioridade
        </button>
        <button
          onClick={() => handleTicketPriorityChange(2)}
          className={`px-4 py-2 rounded ${
            ticketPriority === 2 ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white'
          }`}
        >
          Prioridade
        </button>
        <button
          onClick={() => handleTicketPriorityChange(3)}
          className={`px-4 py-2 rounded ${
            ticketPriority === 3 ? 'bg-red-700 text-white' : 'bg-red-600 text-white'
          }`}
        >
          Muita Prioridade
        </button>
      </div>

      <button
        onClick={generateTicket}
        className="bg-green-600 text-white px-6 py-2 rounded mb-10"
      >
        Gerar Senha
      </button>

      {/* Fila Atual */}
      <h2 className="text-xl mb-2">Fila de Atendimento</h2>
      <div className="bg-gray-100 p-4 rounded mb-4">
        {queue.length > 0 ? (
          <ul className="list-disc ml-5">
            {queue.map((ticket, index) => (
              <li key={index}>{ticket}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma senha na fila.</p>
        )}
      </div>

      {/* Chamar Próximo */}
      <button
        onClick={callNextTicket}
        className="bg-purple-600 text-white px-6 py-2 rounded"
      >
        Chamar Próximo
      </button>

      {calledTicket && (
        <div className="mt-4 text-lg font-semibold">
          Próximo chamado: <span className="text-green-600">{calledTicket}</span>
        </div>
      )}

      {/* Histórico de Senhas Chamadas */}
        {/* Histórico de Senhas Chamadas */}
    <div className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl">Histórico de Senhas Chamadas</h2>
        {calledHistory.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Tem certeza que deseja limpar o histórico?')) {
                setCalledHistory([]);
                localStorage.removeItem('calledHistory');
              }
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Limpar Histórico
          </button>
        )}
      </div>

      {calledHistory.length > 0 ? (
        <ul className="bg-gray-50 p-4 rounded space-y-2">
          {calledHistory.map((ticket, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b pb-1"
            >
              <span className="text-gray-700">{ticket}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma senha chamada ainda.</p>
      )}
    </div>


    </div>
  );
}
