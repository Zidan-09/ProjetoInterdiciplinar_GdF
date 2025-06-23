'use client';

import { useAuth } from '../utils/authRedirect';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReceptionistPage() {
  useAuth('receptionist');

  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [calledTicket, setCalledTicket] = useState<string | null>(null);
  const [calledHistory, setCalledHistory] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    maritalStatus: '',
    cpf: '',
    rg: '',
    contact: '',
    gender: '',
    healthPlan: '',
    address: '',
  });

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  const submitPatientForm = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token não encontrado. Faça login novamente.');

    try {
      const response = await fetch('http://localhost:3333/hospital/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status) {
        alert('Paciente cadastrado com sucesso!');
        setFormData({
          name: '',
          dob: '',
          maritalStatus: '',
          cpf: '',
          rg: '',
          contact: '',
          gender: '',
          healthPlan: '',
          address: '',
        });
        setShowForm(false);
      } else {
        alert(`Erro: ${result.message || 'Erro ao cadastrar paciente.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
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
        setCalledHistory((prev) => [...prev, result.data]);
        await fetchQueue();
      } else {
        setCalledTicket(null);
        alert('A fila está vazia');
      }
    } catch (err) {
      console.error('Erro ao chamar próxima senha:', err);
      alert('Erro ao chamar próxima senha');
    }
  };

  const generateTicket = async (priority: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3333/hospital/ticket/${priority}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await response.json();
      if (result.status && result.data) {
        alert(`Senha gerada com sucesso! Senha: ${result.data}`);
        await fetchQueue();
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel da Recepção</h1>
        <button onClick={logout} className="text-sm text-red-600 hover:underline">Sair</button>
      </div>

      <button
        onClick={toggleForm}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Fechar Cadastro' : 'Cadastrar Novo Paciente'}
      </button>

      {showForm && (
        <div className="mt-4 space-y-2">
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome" className="border p-2 w-full" />
          <input name="dob" value={formData.dob} onChange={handleInputChange} placeholder="Data de Nascimento (YYYY-MM-DD)" className="border p-2 w-full" />
          //botar o calendario

          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Selecione o Estado Civil</option>
            <option value="single">Solteiro(a)</option>
            <option value="married">Casado(a)</option>
            <option value="divorced">Divorciado(a)</option>
            <option value="separeted">Separado(a)</option>
            <option value="widowed">Viúvo(a)</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Selecione o Gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>

          <input name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="CPF" className="border p-2 w-full" />
          <input name="rg" value={formData.rg} onChange={handleInputChange} placeholder="RG" className="border p-2 w-full" />
          <input name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contato" className="border p-2 w-full" />
          <input name="healthPlan" value={formData.healthPlan} onChange={handleInputChange} placeholder="Plano de Saúde" className="border p-2 w-full" />
          <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Endereço" className="border p-2 w-full" />

          <button onClick={submitPatientForm} className="bg-green-600 text-white px-4 py-2 rounded">
            Salvar Paciente
          </button>
        </div>
      )}

      <h2 className="text-xl mt-6 mb-2">Gerar Senha de Atendimento</h2>

      <div className="space-x-4 mb-10">
        <button
          onClick={() => generateTicket(1)}
          className="px-4 py-2 rounded bg-green-400 hover:bg-green-500"
        >
          Sem Prioridade
        </button>
        <button
          onClick={() => generateTicket(2)}
          className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Prioridade
        </button>
        <button
          onClick={() => generateTicket(3)}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Muita Prioridade
        </button>
      </div>

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
              <li key={index} className="flex items-center justify-between border-b pb-1">
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
//tirar o historico de fila,pq vai ficar na tela de chamado