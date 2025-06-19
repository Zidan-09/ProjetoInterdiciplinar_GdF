'use client';

import { useAuth } from '../utils/authRedirect';
import { useState } from 'react';
import PatientRegisterForm from './components/patientRegister';

export default function ReceptionistPage() {
  useAuth('receptionist');

  const [showForm, setShowForm] = useState(false);
  const [ticketPriority, setTicketPriority] = useState<number | null>(null);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleTicketPriorityChange = (priority: number) => {
    setTicketPriority(priority);
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
      const response = await fetch(`http://localhost:3333/hospital/ticket/${ticketPriority}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log('Resposta da API:', result);

      if (result.status && result.data) {
        alert(`Senha gerada com sucesso! Senha: ${result.data}`);
      } else {
        alert(`Erro ao gerar a senha: ${result.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel da Recepção</h1>

      {/* Botão para abrir/fechar o formulário de cadastro de paciente */}
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

      <h2 className="text-xl mt-6 mb-2">Gerar Senha de Atendimento</h2>

      {/* Seletor de prioridade */}
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

      {/* Botão para gerar a senha com a prioridade escolhida */}
      <button
        onClick={generateTicket}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Gerar Senha
      </button>
    </div>
  );
}
