'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Stethoscope, List } from 'lucide-react';

interface QueuePatient {
  name: string;
}

interface QueueData {
  careFlow_id: number;
  patient_name: string;
  triage: {
    vitalSigns: {
      bloodPressure: { systolicPressure: number; diastolicPressure: number };
      heartRate: number;
      respiratoryRate: number;
      bodyTemperature: number;
      oxygenSaturation: number;
    };
    painLevel: number;
    symptoms: string[];
    triageCategory: string;
  };
}

export default function DoctorPage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('realizar');
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [consultStarted, setConsultStarted] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [consultQueue, setConsultQueue] = useState<QueuePatient[]>([]);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    const role = localStorage.getItem('role');
    if (!token || role?.toLowerCase() !== 'doctor') {
      alert('Acesso não autorizado!');
      router.push('/login');
    } else {
      fetchQueue();
    }
  }, []);

  const fetchQueue = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch('http://localhost:3333/queue/byName/consult', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.status && result.data) {
        const names: string[] = result.data;
        const mapped: QueuePatient[] = names.map(name => ({ name }));
        setConsultQueue(mapped);
      }
    } catch (err) {
      console.error('Erro ao buscar fila:', err);
    }
  };

  const callNextPatient = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const token = getToken();
      const res = await fetch('http://localhost:3333/queue/call/consult', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok && result.status) {
        setQueueData(result.data);
        setConsultStarted(false);
        fetchQueue();
      } else {
        setError(result.message || 'Nenhum paciente na fila.');
      }
    } catch {
      setError('Erro ao chamar paciente.');
    } finally {
      setLoading(false);
    }
  };

  const startConsult = async () => {
    if (!queueData) return;
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3333/hospital/consultInit/${queueData.careFlow_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.status) setConsultStarted(true);
      else setError(result.message);
    } catch {
      setError('Erro ao iniciar consulta.');
    } finally {
      setLoading(false);
    }
  };

  const endConsult = async () => {
    if (!queueData) return;
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3333/hospital/consultEnd/${queueData.careFlow_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ diagnosis, prescriptions, notes }),
      });
      const result = await res.json();
      if (result.status) {
        setMessage('Consulta finalizada com sucesso.');
        setQueueData(null);
        setConsultStarted(false);
        setDiagnosis('');
        setPrescriptions([]);
        setNotes('');
        fetchQueue();
      } else {
        setError(result.message);
      }
    } catch {
      setError('Erro ao finalizar consulta.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrescription = (prescription: string) => {
    if (prescription.trim() !== '') {
      setPrescriptions([...prescriptions, prescription]);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-teal-600 text-white flex flex-col justify-between h-screen">
    <div>
      <div className="flex gap-1 mb-6">
        <img src="/Gemini_Generated_Image_9357q79357q79357.png" alt="Logo" className="h-[150px] w-[150px] ml-2 -mt-3" />
        <h1 className="text-lg uppercase font-bold leading-tight tracking-wide -ml-8 mt-6">
          Sistema<br />GdF
        </h1>
      </div>
          <div className="space-y-2 -px-1">
            <button onClick={() => setSelectedSection('realizar')} className={`w-full text-left px-3 py-2 rounded-r-full transition flex items-center gap-2 ${selectedSection === 'realizar' ? 'bg-white text-teal-600 font-semibold shadow' : 'hover:bg-teal-700'}`}>
              <Stethoscope size={16} /> Realizar Consulta
            </button>
            <button onClick={() => setSelectedSection('fila')} className={`w-full text-left px-3 py-2 rounded-r-full transition flex items-center gap-2 ${selectedSection === 'fila' ? 'bg-white text-teal-600 font-semibold shadow' : 'hover:bg-teal-700'}`}>
              <List size={16} /> Ver Fila
            </button>
          </div>
        </div>
        <div className="p-4">
          <button onClick={logout} className="w-full py-2 bg-red-500 rounded-full hover:bg-red-700 flex items-center justify-center gap-2">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10">
        <div className="mb-6">
          <h2 className="text-md text-gray-500">Bem vindo, Médico(a)! 👋</h2>
          <h2 className="text-3xl font-bold text-gray-800">CONSULTAS</h2>
        </div>

        {selectedSection === 'realizar' && (
          <div className="space-y-6">
            {!queueData ? (
              <div className="flex justify-center">
            <button
              onClick={callNextPatient}
              className="bg-verde hover:bg-verdeclaro text-white px-6 py-3 rounded-full shadow"
            >
              {'Chamar Próximo Paciente'}
            </button>
          </div>

            ) : (
              <div className="bg-white shadow-lg rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl text-verde font-bold">Paciente: {queueData.patient_name}</h2>
                  {!consultStarted && (
                    <button onClick={startConsult} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      {loading ? 'Iniciando...' : 'Iniciar Consulta'}
                    </button>
                  )}
                </div>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p><strong>Pressão:</strong> {queueData.triage.vitalSigns.bloodPressure.systolicPressure}/{queueData.triage.vitalSigns.bloodPressure.diastolicPressure}</p>
                  <p><strong>Cardíaca:</strong> {queueData.triage.vitalSigns.heartRate} bpm</p>
                  <p><strong>Respiração:</strong> {queueData.triage.vitalSigns.respiratoryRate} rpm</p>
                  <p><strong>Temperatura:</strong> {queueData.triage.vitalSigns.bodyTemperature} °C</p>
                  <p><strong>Saturação:</strong> {queueData.triage.vitalSigns.oxygenSaturation}%</p>
                  <p><strong>Dor:</strong> {queueData.triage.painLevel}</p>
                  <p><strong>Sintomas:</strong> {queueData.triage.symptoms.join(', ')}</p>
                  <p><strong>Classificação:</strong> {queueData.triage.triageCategory}</p>
                </div>

                {consultStarted && (
                  <div className="mt-5 space-y-4">
                    <textarea placeholder="Diagnóstico" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="w-full border p-1 rounded text-black"></textarea>
                    <textarea placeholder="Notas/Observações" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border p-1 rounded text-black"></textarea>
                    <input type="text" placeholder="Adicionar Prescrição" onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPrescription((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }} className="w-full border p-2 rounded text-black" />
                    {prescriptions.length > 0 && (
                      <ul className="list-disc ml-6 text-gray-700">
                        {prescriptions.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    )}
                    <button onClick={endConsult} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full">
                      {loading ? 'Finalizando...' : 'Finalizar Consulta'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedSection === 'fila' && (
          <div className="bg-white border rounded-xl p-6 shadow">
            <h2 className="text-xl text-verde font-bold mb-4">Fila de Consulta</h2>
            {consultQueue.length > 0 ? (
              <ul className="space-y-2">
                {consultQueue.map((p, i) => (
                  <li key={i} className="p-3 rounded text-black bg-gray-100 shadow">
                    {p.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Nenhum paciente na fila.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
