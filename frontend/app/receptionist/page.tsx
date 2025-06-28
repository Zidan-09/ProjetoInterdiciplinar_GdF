'use client';

import { useAuth } from '../utils/authRedirect';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ClipboardList, UserPlus, List, CheckCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function ReceptionistPage() {
  useAuth('receptionist');
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string>('generate');
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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      const clean = value.replace(/\D/g, '').slice(0, 11);
      const formatted = clean.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
      setFormData((prev) => ({ ...prev, cpf: formatted }));
    } else if (name === 'contact') {
      const clean = value.replace(/\D/g, '').slice(0, 11);
      const formatted = clean.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      setFormData((prev) => ({ ...prev, contact: formatted }));
    } else if (name === 'rg') {
      const clean = value.replace(/\D/g, '').slice(0, 7);
      setFormData((prev) => ({ ...prev, rg: clean }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    return Object.values(formData).every(field => field.trim() !== '');
  };

  const fetchQueue = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3333/queue/byName/recep', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (result.status && result.data) setQueue(result.data);
    } catch (err) {
      console.error('Erro ao buscar fila:', err);
    }
  };

  const callNextTicket = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3333/queue/call/recep', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status && result.data) {
        setCalledTicket(result.data);
        setCalledHistory((prev) => [...prev, result.data]);
        await fetchQueue();
      } else {
        setCalledTicket(null);
        toast.error('A fila está vazia');
      }
    } catch (err) {
      toast.error('Erro ao chamar próxima senha');
    }
  };

  const generateTicket = async (priority: number) => {
    const token = localStorage.getItem('token');
    if (!token) return toast.error('Token não encontrado.');

    try {
      const response = await fetch(`http://localhost:3333/hospital/ticket/${priority}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status && result.data) {
        toast.custom(() => (
          <div className="bg-verde text-white px-6 py-4 rounded-xl shadow-lg border border-verdeclaro flex items-center space-x-4 text-lg">
            <CheckCircle className="text-white w-6 h-6" />
            <div>
              <p className="font-bold">Senha Gerada</p>
              <p className="text-2xl font-semibold">{result.data}</p>
            </div>
          </div>
        ));
        await fetchQueue();
      } else {
        toast.error(result.message || 'Erro ao gerar senha.');
      }
    } catch {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  const submitPatientForm = async () => {
    if (!validateForm()) {
      toast.error('Por favor, preencha todos os campos antes de cadastrar.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return toast.error('Token não encontrado.');

    const cleanCPF = formData.cpf.replace(/\D/g, '');
    const cleanContact = formData.contact.replace(/\D/g, '');

    const dataToSend = {
      ...formData,
      cpf: cleanCPF,
      contact: cleanContact,
    };

    try {
      const response = await fetch('http://localhost:3333/hospital/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (result.status) {
        toast.success('Paciente cadastrado com sucesso!');
        setFormData({
          name: '', 
          dob: '', 
          maritalStatus: '', 
          cpf: '',
          rg: '', 
          contact: '', 
          gender: '', 
          healthPlan: '', 
          address: ''
        });
        setSelectedOption('form');
      } else {
        toast.error(result.message || 'Erro ao cadastrar.');
      }
    } catch {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  useEffect(() => { fetchQueue(); }, []);
  useEffect(() => {
    const stored = localStorage.getItem('calledHistory');
    if (stored) setCalledHistory(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem('calledHistory', JSON.stringify(calledHistory));
  }, [calledHistory]);

  return (
    <>
      <Toaster position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.25rem',
            padding: '14px 22px',
            borderRadius: '12px',
          },
        }}
      />
      <div className="flex h-screen bg-white">
  <div className="w-64 bg-teal-600 text-white flex flex-col justify-between h-screen">
    <div>
      <div className="flex gap-1 mb-6">
        <img src="/Gemini_Generated_Image_9357q79357q79357.png" alt="Logo" className="h-[150px] w-[150px] ml-2 -mt-3" />
        <h1 className="text-lg uppercase font-bold leading-tight tracking-wide -ml-8 mt-6">
          Sistema<br />GdF
        </h1>
      </div>

      <div className="space-y-2 -px-1">
        <div onClick={() => setSelectedOption('generate')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 w-full transition ${selectedOption === 'generate' ? 'bg-white text-teal-600 font-semibold shadow rounded-r-full' : 'hover:bg-teal-700'}`}><ClipboardList size={16} /> Gerar Senha</div>
        <div onClick={() => setSelectedOption('form')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 w-full transition ${selectedOption === 'form' ? 'bg-white text-teal-600 font-semibold shadow rounded-r-full' : 'hover:bg-teal-700'}`}><UserPlus size={16} /> Cadastro do Paciente</div>
        <div onClick={() => { fetchQueue(); setSelectedOption('queue'); }} className={`flex items-center gap-2 cursor-pointer px-3 py-2 w-full transition ${selectedOption === 'queue' ? 'bg-white text-teal-600 font-semibold shadow rounded-r-full' : 'hover:bg-teal-700'}`}><List size={16} /> Fila Atual</div>
      </div>
    </div>

    <div className="p-4">
      <button onClick={logout} className="w-full py-2 bg-red-500 rounded-full text-sm hover:bg-red-700 flex items-center justify-center gap-2">
        <LogOut size={16} /> Sair
      </button>
    </div>
  </div>

  <div className="flex-1 overflow-y-auto p-10">
    <div className="mb-6">
      <h2 className="text-md text-gray-500 -mb-1 whitespace-nowrap">Bem vindo! 👋</h2>
      <h2 className="text-3xl font-bold text-gray-800">RECEPÇÃO</h2>
    </div>

    {selectedOption === 'generate' && (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <button onClick={() => generateTicket(1)} className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-full shadow">Sem Prioridade</button>
          <button onClick={() => generateTicket(2)} className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold rounded-full shadow">Prioridade</button>
          <button onClick={() => generateTicket(3)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-full shadow">Muita Prioridade</button>
        </div>
      </div>
    )}

    {selectedOption === 'form' && (
      <div className="bg-white shadow rounded-xl p-8 w-full max-w-full">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
          {['name', 'dob', 'maritalStatus', 'gender', 'cpf', 'rg', 'contact', 'healthPlan', 'address'].map((field, idx) => (
            <div key={idx} className="col-span-2 sm:col-span-1">
              <label className="block text-sm text-gray-700 mb-1 font-medium capitalize">
                {{
                  name: 'Nome',
                  dob: 'Data de Nascimento',
                  maritalStatus: 'Estado Civil',
                  gender: 'Gênero',
                  cpf: 'CPF',
                  rg: 'RG',
                  contact: 'Contato',
                  healthPlan: 'Plano de Saúde',
                  address: 'Endereço'
                }[field as keyof typeof formData]}
              </label>
              {['maritalStatus', 'gender'].includes(field) ? (
                <select name={field} value={formData[field as keyof typeof formData]} onChange={handleInputChange} className="border p-2 w-full text-black rounded">
                  <option value="" disabled hidden>
                    {field === 'maritalStatus' ? 'Selecione o Estado Civil' : 'Selecione o Gênero'}
                  </option>
                  {field === 'maritalStatus' && (
                    <>
                      <option value="single">Solteiro(a)</option>
                      <option value="married">Casado(a)</option>
                      <option value="divorced">Divorciado(a)</option>
                      <option value="separeted">Separado(a)</option>
                      <option value="widowed">Viúvo(a)</option>
                    </>
                  )}
                  {field === 'gender' && (
                    <>
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                      <option value="other">Outro</option>
                    </>
                  )}
                </select>
              ) : (
                <input name={field} type={field === 'dob' ? 'date' : 'text'} value={formData[field as keyof typeof formData]} onChange={handleInputChange} placeholder={field} className="border p-2 w-full rounded text-sm text-black" />
              )}
            </div>
          ))}
          <div className="col-span-2">
            <button onClick={submitPatientForm} className="w-full bg-emerald-600 text-white px-5 py-3 rounded-full hover:bg-emerald-700 mt-6 shadow">Cadastrar Paciente</button>
          </div>
        </div>
      </div>
    )}

    {selectedOption === 'queue' && (
      <div className="mt-8 max-w-8xl">
        <div className="bg-white border border-gray-200 shadow rounded-xl p-6 max-h-[400px] overflow-y-auto">
          {queue.length > 0 ? (
            <ul className="space-y-3">
              {queue.map((ticket, i) => (
                <li key={i} className="px-4 py-2 rounded bg-gray-100 text-2xl font-medium text-gray-700">
                  {ticket}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 italic py-4">Nenhuma senha na fila no momento.</div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={callNextTicket}
            className="bg-verde hover:bg-verdeclaro text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            Chamar Próximo
          </button>

          {calledTicket && (
            <div className="mt-6 text-xl font-bold text-purple-700 bg-purple-100 border border-purple-300 px-6 py-4 rounded-xl shadow">
              Próximo chamado: <span className="text-purple-800">{calledTicket}</span>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</div>
</>
  );
}

