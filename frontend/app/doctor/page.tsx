'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface QueuePatient {
  patient_name: string;
  triageCategory: string;
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
    const token = localStorage.getItem('token');
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
      const response = await fetch('http://localhost:3333/queue/byName/consult', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status && result.data) setConsultQueue(result.data);
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
      if (!token) throw new Error('Token não encontrado.');

      const response = await fetch('http://localhost:3333/queue/call/consult', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok && result.status) {
        setQueueData(result.data);
        setConsultStarted(false);
        fetchQueue();
      } else {
        setError(result.message || 'Nenhum paciente na fila.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao chamar paciente.');
    } finally {
      setLoading(false);
    }
  };

  const startConsult = async () => {
    if (!queueData) return;
    setLoading(true);
    setError('');
    try {
      const token = getToken();
      if (!token) throw new Error('Token não encontrado.');

      const response = await fetch(`http://localhost:3333/hospital/consultInit/${queueData.careFlow_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status) {
        setConsultStarted(true);
      } else {
        setError(result.message || 'Erro ao iniciar consulta.');
      }
    } catch (err) {
      console.error(err);
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
      if (!token) throw new Error('Token não encontrado.');

      const response = await fetch(`http://localhost:3333/hospital/consultEnd/${queueData.careFlow_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          diagnosis,
          prescriptions,
          notes,
        }),
      });
      const result = await response.json();
      if (result.status) {
        setMessage('Consulta finalizada com sucesso.');
        setQueueData(null);
        setConsultStarted(false);
        setDiagnosis('');
        setPrescriptions([]);
        setNotes('');
        fetchQueue();
      } else {
        setError(result.message || 'Erro ao finalizar consulta.');
      }
    } catch (err) {
      console.error(err);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'non_urgent':
        return 'bg-green-400';
      case 'urgent':
        return 'bg-yellow-300';
      case 'very_urgent':
        return 'bg-orange-400';
      case 'emergency':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-56 bg-teal-500 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-6">Sistema GdF</h2>
          <button onClick={() => setSelectedSection('realizar')} className={`w-full mb-2 py-2 rounded ${selectedSection === 'realizar' ? 'bg-white text-black' : 'hover:bg-teal-600'}`}>
            Realizar Consulta
          </button>
          <button onClick={() => setSelectedSection('fila')} className={`w-full mb-2 py-2 rounded ${selectedSection === 'fila' ? 'bg-white text-black' : 'hover:bg-teal-600'}`}>
            Ver Fila de Consulta
          </button>
        </div>
        <button onClick={logout} className="text-red-200 hover:underline text-left">Sair</button>
      </div>

      {/* Área de Conteúdo */}
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <h1 className="text-2xl font-bold mb-4 text-black">Bem-vindo, Doutor 👨‍⚕️</h1>

        {selectedSection === 'realizar' && (
          <div>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!queueData && (
              <button
                onClick={callNextPatient}
                disabled={loading}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                {loading ? 'Chamando...' : 'Chamar Próximo Paciente'}
              </button>
            )}

            {queueData && (
              <div className="space-y-3 mt-4">
                <h2 className="text-xl font-semibold">Paciente: {queueData.patient_name}</h2>
                <p><strong>Pressão:</strong> {queueData.triage.vitalSigns.bloodPressure.systolicPressure}/{queueData.triage.vitalSigns.bloodPressure.diastolicPressure}</p>
                <p><strong>Frequência Cardíaca:</strong> {queueData.triage.vitalSigns.heartRate} bpm</p>
                <p><strong>Respiração:</strong> {queueData.triage.vitalSigns.respiratoryRate} rpm</p>
                <p><strong>Temperatura:</strong> {queueData.triage.vitalSigns.bodyTemperature} °C</p>
                <p><strong>Saturação:</strong> {queueData.triage.vitalSigns.oxygenSaturation}%</p>
                <p><strong>Nível de Dor:</strong> {queueData.triage.painLevel}</p>
                <p><strong>Sintomas:</strong> {queueData.triage.symptoms.join(', ')}</p>
                <p><strong>Classificação:</strong> {queueData.triage.triageCategory}</p>

                {!consultStarted && (
                  <button
                    onClick={startConsult}
                    disabled={loading}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {loading ? 'Iniciando...' : 'Iniciar Consulta'}
                  </button>
                )}

                {consultStarted && (
                  <div className="space-y-2">
                    <textarea
                      placeholder="Diagnóstico"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <textarea
                      placeholder="Notas/Observações"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Adicionar Prescrição"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddPrescription((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                      className="w-full border p-2 rounded"
                    />
                    {prescriptions.length > 0 && (
                      <div>
                        <p>Prescrições:</p>
                        <ul className="list-disc ml-6">
                          {prescriptions.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={endConsult}
                      disabled={loading}
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      {loading ? 'Finalizando...' : 'Finalizar Consulta'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedSection === 'fila' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Fila de Consulta Atual</h2>
            {consultQueue.length > 0 ? (
              <ul>
                {consultQueue.map((p, idx) => (
                  <li
                    key={idx}
                    className={`p-2 mb-1 rounded text-black ${getCategoryColor(p.triageCategory)}`}
                  >
                    {p.patient_name} - {p.triageCategory}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum paciente na fila.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';

// interface QueueData {
//   careFlow_id: number;
//   patient_name: string;
//   triage: {
//     vitalSigns: {
//       bloodPressure: {
//         systolicPressure: number;
//         diastolicPressure: number;
//       };
//       heartRate: number;
//       respiratoryRate: number;
//       bodyTemperature: number;
//       oxygenSaturation: number;
//     };
//     painLevel: number;
//     symptoms: string[];
//     triageCategory: string;
//   };
// }

// export default function DoctorPage() {
//   const [queueData, setQueueData] = useState<QueueData | null>(null);
//   const [consultStarted, setConsultStarted] = useState(false);
//   const [diagnosis, setDiagnosis] = useState('');
//   const [prescriptions, setPrescriptions] = useState<string[]>([]);
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const getToken = () => localStorage.getItem('token');

//   const callNextPatient = async () => {
//     setLoading(true);
//     setMessage('');
//     setError('');
//     try {
//       const token = getToken();
//       if (!token) throw new Error('Token não encontrado. Faça login novamente.');

//       const response = await fetch('http://localhost:3333/queue/call/consult', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       if (response.ok && result.status) {
//         setQueueData(result.data);
//       } else {
//         setError(result.message || 'Erro ao chamar próximo paciente.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Falha ao conectar com o servidor.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startConsult = async () => {
//     if (!queueData) return;

//     setLoading(true);
//     setMessage('');
//     setError('');
//     try {
//       const token = getToken();
//       if (!token) throw new Error('Token não encontrado. Faça login novamente.');

//       const response = await fetch(`http://localhost:3333/hospital/consultInit/${queueData.careFlow_id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       if (response.ok && result.status) {
//         setConsultStarted(true);
//         setMessage('Consulta iniciada.');
//       } else {
//         setError(result.message || 'Erro ao iniciar consulta.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Falha ao iniciar consulta.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const endConsult = async () => {
//     if (!queueData) return;

//     setLoading(true);
//     setMessage('');
//     setError('');
//     try {
//       const token = getToken();
//       if (!token) throw new Error('Token não encontrado. Faça login novamente.');

//       const response = await fetch(`http://localhost:3333/hospital/consultEnd/${queueData.careFlow_id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           diagnosis,
//           prescriptions,
//           notes,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok && result.status) {
//         setMessage('Consulta finalizada com sucesso.');
//         setQueueData(null);
//         setConsultStarted(false);
//         setDiagnosis('');
//         setPrescriptions([]);
//         setNotes('');
//       } else {
//         setError(result.message || 'Erro ao finalizar consulta.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Falha ao finalizar consulta.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddPrescription = (prescription: string) => {
//     if (prescription.trim() !== '') {
//       setPrescriptions([...prescriptions, prescription]);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-8 p-4 border rounded shadow space-y-4">
//       <h1 className="text-2xl font-bold">Atendimento Médico</h1>

//       {message && <p className="text-green-600">{message}</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!queueData && (
//         <button
//           onClick={callNextPatient}
//           disabled={loading}
//           className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {loading ? 'Chamando...' : 'Chamar Próximo Paciente'}
//         </button>
//       )}

//       {queueData && (
//         <div className="space-y-2">
//           <h2 className="text-xl font-semibold">Paciente: {queueData.patient_name}</h2>
//           <p><strong>Pressão:</strong> {queueData.triage.vitalSigns.bloodPressure.systolicPressure}/{queueData.triage.vitalSigns.bloodPressure.diastolicPressure}</p>
//           <p><strong>Frequência Cardíaca:</strong> {queueData.triage.vitalSigns.heartRate} bpm</p>
//           <p><strong>Respiração:</strong> {queueData.triage.vitalSigns.respiratoryRate} rpm</p>
//           <p><strong>Temperatura:</strong> {queueData.triage.vitalSigns.bodyTemperature} °C</p>
//           <p><strong>Saturação:</strong> {queueData.triage.vitalSigns.oxygenSaturation}%</p>
//           <p><strong>Nível de Dor:</strong> {queueData.triage.painLevel}</p>
//           <p><strong>Sintomas:</strong> {queueData.triage.symptoms.join(', ')}</p>
//           <p><strong>Categoria da Triagem:</strong> {queueData.triage.triageCategory}</p>

//           {!consultStarted && (
//             <button
//               onClick={startConsult}
//               disabled={loading}
//               className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               {loading ? 'Iniciando...' : 'Iniciar Consulta'}
//             </button>
//           )}

//           {consultStarted && (
//             <div className="space-y-2 mt-4">
//               <textarea
//                 placeholder="Diagnóstico"
//                 value={diagnosis}
//                 onChange={(e) => setDiagnosis(e.target.value)}
//                 className="w-full border p-2 rounded"
//                 required
//               />

//               <textarea
//                 placeholder="Notas/Observações"
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 className="w-full border p-2 rounded"
//               />

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Adicionar Prescrição (ex: Benegripe)"
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       handleAddPrescription((e.target as HTMLInputElement).value);
//                       (e.target as HTMLInputElement).value = '';
//                     }
//                   }}
//                   className="w-full border p-2 rounded"
//                 />
//                 {prescriptions.length > 0 && (
//                   <div>
//                     <p>Prescrições:</p>
//                     <ul className="list-disc ml-6">
//                       {prescriptions.map((p, idx) => (
//                         <li key={idx}>{p}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={endConsult}
//                 disabled={loading}
//                 className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 {loading ? 'Finalizando...' : 'Finalizar Consulta'}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
//reaizar consulta(inicia consulta)
//ver fila(bolinha com a cor para verificar)
//Botar lugar para ver a fila