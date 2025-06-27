'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ClipboardList, List } from 'lucide-react';
import toast from 'react-hot-toast';


export default function NursePage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<'realizar' | 'fila'>('realizar');
  const [triageQueue, setTriageQueue] = useState<string[]>([]);
  const [calledPatient, setCalledPatient] = useState<{ patient_name: string; careFlow_id: number } | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vitalSigns: {
      bloodPressure: { systolicPressure: '', diastolicPressure: '' },
      heartRate: '',
      respiratoryRate: '',
      bodyTemperature: '',
      oxygenSaturation: '',
    },
    painLevel: '',
    symptoms: '',
    triageCategory: 'non_urgent',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role?.toLowerCase() !== 'nurse') {
      alert('Acesso não autorizado!');
      router.push('/login');
    } else {
      fetchQueue();
    }
  }, []);

  const fetchQueue = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await fetch('http://localhost:3333/queue/byName/triage', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status && result.data) setTriageQueue(result.data);
    } catch (err) {
      console.error('Erro ao buscar fila:', err);
    }
  };

  const callNextPatient = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3333/queue/call/triage', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status && result.data) {
        setCalledPatient(result.data);
        setFormVisible(false);
        fetchQueue();
      } else {
        alert('Nenhum paciente na fila.');
      }
    } catch (err) {
      console.error('Erro ao chamar paciente:', err);
    }
    setLoading(false);
  };

  const iniciarTriagem = async () => {
    const token = localStorage.getItem('token');
    const careFlow_id = calledPatient?.careFlow_id;
    if (!token || !careFlow_id) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3333/hospital/triageInit/${careFlow_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.status) setFormVisible(true);
      else alert('Erro ao iniciar triagem');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const finalizarTriagem = async () => {
    const token = localStorage.getItem('token');
    const careFlow_id = calledPatient?.careFlow_id;
    if (!token || !careFlow_id) return;

    const payload = {
      ...formData,
      painLevel: Number(formData.painLevel),
      vitalSigns: {
        bloodPressure: {
          systolicPressure: Number(formData.vitalSigns.bloodPressure.systolicPressure),
          diastolicPressure: Number(formData.vitalSigns.bloodPressure.diastolicPressure),
        },
        heartRate: Number(formData.vitalSigns.heartRate),
        respiratoryRate: Number(formData.vitalSigns.respiratoryRate),
        bodyTemperature: Number(formData.vitalSigns.bodyTemperature),
        oxygenSaturation: Number(formData.vitalSigns.oxygenSaturation),
      },
      symptoms: formData.symptoms.split(',').map((s) => s.trim()),
    };

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3333/hospital/triageEnd/${careFlow_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      alert(result.message);
      setFormVisible(false);
      setCalledPatient(null);
      resetForm();
      fetchQueue();
    } catch (err) {
      console.error(err);
      alert('Erro ao finalizar triagem');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      vitalSigns: {
        bloodPressure: { systolicPressure: '', diastolicPressure: '' },
        heartRate: '',
        respiratoryRate: '',
        bodyTemperature: '',
        oxygenSaturation: '',
      },
      painLevel: '',
      symptoms: '',
      triageCategory: 'non_urgent',
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'systolicPressure' || name === 'diastolicPressure') {
      setFormData({
        ...formData,
        vitalSigns: {
          ...formData.vitalSigns,
          bloodPressure: { ...formData.vitalSigns.bloodPressure, [name]: value },
        },
      });
    } else if (name in formData.vitalSigns) {
      setFormData({
        ...formData,
        vitalSigns: { ...formData.vitalSigns, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-teal-600 text-white p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img src="/Gemini_Generated_Image_9357q79357q79357.png" alt="Logo" className="h-16 w-16" />
            <h1 className="text-lg font-bold uppercase">Sistema GdF</h1>
          </div>
          <div className="space-y-2">
            <div onClick={() => setSelectedSection('realizar')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'realizar' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <ClipboardList size={16} /> Realizar Triagem
            </div>
            <div onClick={() => setSelectedSection('fila')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'fila' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <List size={16} /> Ver Fila
            </div>
          </div>
        </div>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-6 flex items-center gap-2">
          <LogOut size={16} /> Sair
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Triagem de Pacientes</h1>

        {selectedSection === 'fila' && (
          <div className="bg-white border border-gray-200 shadow rounded-xl p-6">
            {triageQueue.length > 0 ? (
              <ul className="space-y-3 mb-6">
                {triageQueue.map((ticket, i) => (
                  <li key={i} className="px-4 py-2 rounded bg-gray-100 text-2xl font-medium text-gray-700">
                    {ticket}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 italic py-4">
                Nenhum paciente na fila no momento.
              </div>
            )}
          </div>
        )}

        {selectedSection === 'realizar' && (
          <div className="bg-white border border-gray-200 shadow rounded-xl p-2">
            {!formVisible && (
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">Clique abaixo para chamar o próximo paciente da fila</p>
                <button
                  onClick={callNextPatient}
                  className="bg-verde hover:bg-verdeclaro text-white font-semibold px-6 py-3 rounded-full shadow-md"
                >
                  Chamar Próximo Paciente
                </button>
              </div>
            )}

            {calledPatient && (
              <div className="mt-8 bg-verde border border-verdeclaro p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-white">Paciente Chamado</p>
                    <p className="text-white">Nome: {calledPatient.patient_name}</p>
                    <p className="text-white">ID: {calledPatient.careFlow_id}</p>
                  </div>
                  {!formVisible && (
                    <button onClick={iniciarTriagem} className="ml-4 bg-green-400 hover:bg-green-300 text-white px-5 py-2 rounded-full shadow">
                      Iniciar Triagem
                    </button>
                  )}
                </div>

                {formVisible && (
                  <form className="mt-5 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4 text-white">Formulário de Triagem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="number" name="systolicPressure" placeholder="Pressão Sistólica" onChange={handleChange} value={formData.vitalSigns.bloodPressure.systolicPressure} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="number" name="diastolicPressure" placeholder="Pressão Diastólica" onChange={handleChange} value={formData.vitalSigns.bloodPressure.diastolicPressure} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="number" name="heartRate" placeholder="Frequência Cardíaca" onChange={handleChange} value={formData.vitalSigns.heartRate} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="number" name="respiratoryRate" placeholder="Frequência Respiratória" onChange={handleChange} value={formData.vitalSigns.respiratoryRate} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="number" name="bodyTemperature" placeholder="Temperatura Corporal" step="0.1" onChange={handleChange} value={formData.vitalSigns.bodyTemperature} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="number" name="oxygenSaturation" placeholder="Saturação de Oxigênio" onChange={handleChange} value={formData.vitalSigns.oxygenSaturation} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="number" name="painLevel" placeholder="Nível de Dor (0-10)" min={0} max={10} onChange={handleChange} value={formData.painLevel} className="border p-2 rounded text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <input type="text" name="symptoms" placeholder="Sintomas (separados por vírgula)" onChange={handleChange} value={formData.symptoms} className="border-bg-verde p-2 rounded text-black" />
                      <select name="triageCategory" value={formData.triageCategory} onChange={handleChange} className="border p-2 rounded text-black">
                        <option value="non_urgent">Pouco Urgente</option>
                        <option value="urgent">Urgente</option>
                        <option value="very_urgent">Muito Urgente</option>
                        <option value="emergency">Emergência</option>
                      </select>
                    </div>
                    <button onClick={finalizarTriagem} type="button" className="mt-6 w-full bg-green-600 text-white px-5 py-3 rounded-full hover:bg-green-700 shadow">
                      Finalizar Triagem
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { LogOut, ClipboardList, UserPlus, List } from 'lucide-react';

// export default function NursePage() {
//   const router = useRouter();
//   const [selectedSection, setSelectedSection] = useState('realizar');
//   const [triageQueue, setTriageQueue] = useState<string[]>([]);
//   const [calledPatient, setCalledPatient] = useState<{ patient_name: string; careFlow_id: number } | null>(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     vitalSigns: {
//       bloodPressure: { systolicPressure: '', diastolicPressure: '' },
//       heartRate: '',
//       respiratoryRate: '',
//       bodyTemperature: '',
//       oxygenSaturation: '',
//     },
//     painLevel: '',
//     symptoms: '',
//     triageCategory: 'non_urgent',
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     if (!token || role?.toLowerCase() !== 'nurse') {
//       alert('Acesso não autorizado!');
//       router.push('/login');
//     } else {
//       fetchQueue();
//     }
//   }, []);

//   const fetchQueue = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;
//     try {
//       const response = await fetch('http://localhost:3333/queue/byName/triage', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       if (result.status && result.data) setTriageQueue(result.data);
//     } catch (err) {
//       console.error('Erro ao buscar fila:', err);
//     }
//   };

//   const callNextPatient = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:3333/queue/call/triage', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       if (result.status && result.data) {
//         setCalledPatient(result.data);
//         setFormVisible(false);
//         fetchQueue();
//       } else {
//         alert('Nenhum paciente na fila.');
//       }
//     } catch (err) {
//       console.error('Erro ao chamar paciente:', err);
//     }
//     setLoading(false);
//   };

//   const iniciarTriagem = async () => {
//     const token = localStorage.getItem('token');
//     const careFlow_id = calledPatient?.careFlow_id;
//     if (!token || !careFlow_id) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3333/hospital/triageInit/${careFlow_id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       if (result.status) setFormVisible(true);
//       else alert('Erro ao iniciar triagem');
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const finalizarTriagem = async () => {
//     const token = localStorage.getItem('token');
//     const careFlow_id = calledPatient?.careFlow_id;
//     if (!token || !careFlow_id) return;

//     const payload = {
//       ...formData,
//       painLevel: Number(formData.painLevel),
//       vitalSigns: {
//         bloodPressure: {
//           systolicPressure: Number(formData.vitalSigns.bloodPressure.systolicPressure),
//           diastolicPressure: Number(formData.vitalSigns.bloodPressure.diastolicPressure),
//         },
//         heartRate: Number(formData.vitalSigns.heartRate),
//         respiratoryRate: Number(formData.vitalSigns.respiratoryRate),
//         bodyTemperature: Number(formData.vitalSigns.bodyTemperature),
//         oxygenSaturation: Number(formData.vitalSigns.oxygenSaturation),
//       },
//       symptoms: formData.symptoms.split(',').map((s) => s.trim()),
//     };

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3333/hospital/triageEnd/${careFlow_id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();
//       setNotification(result.message || 'Triagem finalizada com sucesso.');
//       setFormVisible(false);
//       setCalledPatient(null);
//       resetForm();
//       fetchQueue();
//       setTimeout(() => setNotification(null), 5000);
//     } catch (err) {
//       console.error(err);
//       alert('Erro ao finalizar triagem');
//     }
//     setLoading(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       vitalSigns: {
//         bloodPressure: { systolicPressure: '', diastolicPressure: '' },
//         heartRate: '',
//         respiratoryRate: '',
//         bodyTemperature: '',
//         oxygenSaturation: '',
//       },
//       painLevel: '',
//       symptoms: '',
//       triageCategory: 'non_urgent',
//     });
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     if (name === 'systolicPressure' || name === 'diastolicPressure') {
//       setFormData({
//         ...formData,
//         vitalSigns: {
//           ...formData.vitalSigns,
//           bloodPressure: { ...formData.vitalSigns.bloodPressure, [name]: value },
//         },
//       });
//     } else if (name in formData.vitalSigns) {
//       setFormData({
//         ...formData,
//         vitalSigns: { ...formData.vitalSigns, [name]: value },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     router.push('/login');
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Lateral */}
//       <div className="w-64 bg-teal-600 text-white p-0 flex flex-col justify-between">
//         <div>
//           <div className="flex gap-1 mb-6">
//             <img 
//               src="/Gemini_Generated_Image_9357q79357q79357.png"
//               alt="Logo" 
//               className="h-[150px] w-[150px] ml-2 -mt-3" 
//             />
//             <h1 className="text-lg uppercase font-bold leading-tight tracking-wide -ml-8 mt-6">
//               Sistema<br />GdF
//             </h1>
//           </div>

//           <div className="space-y-2">
//             <div onClick={() => setSelectedSection('realizar')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-full w-full transition ${selectedSection === 'realizar' ? 'bg-white text-teal-600 font-semibold shadow' : 'hover:bg-teal-700'}`}>
//               <ClipboardList size={16} /> Realizar Triagem
//             </div>
//             <div onClick={() => setSelectedSection('fila')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-full w-full transition ${selectedSection === 'fila' ? 'bg-white text-teal-600 font-semibold shadow' : 'hover:bg-teal-700'}`}>
//               <List size={16} /> Ver Fila da Triagem
//             </div>
//             <div onClick={() => setSelectedSection('alterar')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-full w-full transition ${selectedSection === 'alterar' ? 'bg-white text-teal-600 font-semibold shadow' : 'hover:bg-teal-700'}`}>
//               <UserPlus size={16} /> Alterar Classificação
//             </div>
//           </div>
//         </div>

//         <button 
//           onClick={logout} 
//           className="mt-6 py-2 bg-red-500 rounded-full text-sm hover:bg-red-700 flex items-center justify-center gap-2"
//         >
//           <LogOut size={16} /> Sair
//         </button>
//       </div>
//       <div className="flex-1 p-6 overflow-y-auto bg-white">
//         {notification && (
//           <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow text-center">
//             {notification}
//           </div>
//         )}


//       <div className="flex-1 p-6 overflow-y-auto bg-white">
//         <h1 className="text-2xl font-bold mb-4 text-black">Bem-vinda, Enfermeira 👩‍⚕️</h1>

//         {selectedSection === 'realizar' && (
//           <div>
//             {calledPatient ? (
//               <div className="p-4 border rounded mb-4 bg-blue-50">
//                 <h2 className="text-lg font-semibold">Paciente Chamado:</h2>
//                 <p><strong>Nome:</strong> {calledPatient.patient_name}</p>
//                 <p><strong>ID:</strong> {calledPatient.careFlow_id}</p>

//                 {!formVisible && (
//                   <button onClick={iniciarTriagem} className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
//                     Iniciar Triagem
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <button onClick={callNextPatient} className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">
//                 Chamar Próximo Paciente
//               </button>
//             )}

//             {formVisible && (
//               <form className="mt-4 bg-white p-4 rounded shadow">
//                 <h2 className="text-lg font-bold mb-2">Formulário de Triagem</h2>

//                 <label>Pressão Sistólica</label>
//                 <input type="number" name="systolicPressure" onChange={handleChange} value={formData.vitalSigns.bloodPressure.systolicPressure} className="border p-2 w-full mb-2" />

//                 <label>Pressão Diastólica</label>
//                 <input type="number" name="diastolicPressure" onChange={handleChange} value={formData.vitalSigns.bloodPressure.diastolicPressure} className="border p-2 w-full mb-2" />

//                 <label>Frequência Cardíaca</label>
//                 <input type="number" name="heartRate" onChange={handleChange} value={formData.vitalSigns.heartRate} className="border p-2 w-full mb-2" />

//                 <label>Frequência Respiratória</label>
//                 <input type="number" name="respiratoryRate" onChange={handleChange} value={formData.vitalSigns.respiratoryRate} className="border p-2 w-full mb-2" />

//                 <label>Temperatura Corporal</label>
//                 <input type="number" step="0.1" name="bodyTemperature" onChange={handleChange} value={formData.vitalSigns.bodyTemperature} className="border p-2 w-full mb-2" />

//                 <label>Saturação de Oxigênio</label>
//                 <input type="number" name="oxygenSaturation" onChange={handleChange} value={formData.vitalSigns.oxygenSaturation} className="border p-2 w-full mb-2" />

//                 <label>Nível de Dor (0 a 10)</label>
//                 <input type="number" name="painLevel" min={0} max={10} onChange={handleChange} value={formData.painLevel} className="border p-2 w-full mb-2" />

//                 <label>Sintomas</label>
//                 <input type="text" name="symptoms" onChange={handleChange} value={formData.symptoms} className="border p-2 w-full mb-2" />

//                 <label>Classificação de Risco</label>
//                 <select name="triageCategory" value={formData.triageCategory} onChange={handleChange} className="border p-2 w-full mb-4">
//                   <option value="non_urgent">Pouco Urgente</option>
//                   <option value="urgent">Urgente</option>
//                   <option value="very_urgent">Muito Urgente</option>
//                   <option value="emergency">Emergência</option>
//                 </select>

//                 <button onClick={finalizarTriagem} type="button" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//                   Finalizar Triagem
//                 </button>
//               </form>
//             )}
//           </div>
//         )}

//         {selectedSection === 'fila' && (
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Fila Atual de Triagem</h2>
//             <div className="bg-gray-100 p-4 rounded">
//               {triageQueue.length > 0 ? (
//                 <ul className="list-disc ml-6">
//                   {triageQueue.map((name, index) => (
//                     <li key={index}>{name}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>Nenhum paciente na fila.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {selectedSection === 'alterar' && (
//           <div>
//             <h2 className="text-xl font-semibold">Alterar Classificação de Risco</h2>
//             <p className="text-gray-500 mt-2">Funcionalidade em desenvolvimento...</p>
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// }






// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function NursePage() {
//   const router = useRouter();

//   const [triageQueue, setTriageQueue] = useState<string[]>([]);
//   const [calledPatient, setCalledPatient] = useState<{
//     patient_name: string;
//     careFlow_id: number;
//   } | null>(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     vitalSigns: {
//       bloodPressure: {
//         systolicPressure: 120,
//         diastolicPressure: 80,
//       },
//       heartRate: 80,
//       respiratoryRate: 20,
//       bodyTemperature: 36,
//       oxygenSaturation: 98,
//     },
//     painLevel: 0,
//     symptoms: '',
//     triageCategory: 'non_urgent',
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (!token || role?.toLowerCase() !== 'nurse') {
//       alert('Acesso não autorizado. Redirecionando...');
//       router.push('/login');
//     } else {
//       fetchQueue();
//     }
//   }, []);

//   const fetchQueue = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch('http://localhost:3333/queue/byName/triage', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       if (result.status && result.data) {
//         setTriageQueue(result.data);
//       }
//     } catch (err) {
//       console.error('Erro ao buscar fila de triagem:', err);
//     }
//   };

//   const callNextPatient = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:3333/queue/call/triage', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();

//       if (result.status && result.data) {
//         const { patient_name, careFlow_id } = result.data;
//         localStorage.setItem('careFlow_id', careFlow_id.toString());
//         setCalledPatient({ patient_name, careFlow_id });
//         setFormVisible(false);
//         fetchQueue();
//       } else {
//         alert('Nenhum paciente na fila.');
//       }
//     } catch (err) {
//       console.error('Erro ao chamar paciente:', err);
//     }
//     setLoading(false);
//   };

//   const iniciarTriagem = async () => {
//     const token = localStorage.getItem('token');
//     const careFlow_id = calledPatient?.careFlow_id;
//     if (!token || !careFlow_id) return;

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3333/hospital/triageInit/${careFlow_id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       if (result.status) {
//         setFormVisible(true);
//       } else {
//         alert('Erro ao iniciar triagem');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const finalizarTriagem = async () => {
//     const token = localStorage.getItem('token');
//     const careFlow_id = calledPatient?.careFlow_id;
//     if (!token || !careFlow_id) return;

//     const payload = {
//       ...formData,
//       painLevel: Number(formData.painLevel),
//       vitalSigns: {
//         ...formData.vitalSigns,
//         bloodPressure: {
//           systolicPressure: Number(formData.vitalSigns.bloodPressure.systolicPressure),
//           diastolicPressure: Number(formData.vitalSigns.bloodPressure.diastolicPressure),
//         },
//         heartRate: Number(formData.vitalSigns.heartRate),
//         respiratoryRate: Number(formData.vitalSigns.respiratoryRate),
//         bodyTemperature: Number(formData.vitalSigns.bodyTemperature),
//         oxygenSaturation: Number(formData.vitalSigns.oxygenSaturation),
//       },
//       symptoms: formData.symptoms.split(',').map((s) => s.trim()),
//     };

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3333/hospital/triageEnd/${careFlow_id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       alert(result.message);

//       setFormVisible(false);
//       setCalledPatient(null);
//       resetForm();
//       fetchQueue();
//     } catch (err) {
//       console.error(err);
//       alert('Erro ao finalizar triagem');
//     }
//     setLoading(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       vitalSigns: {
//         bloodPressure: {
//           systolicPressure: 120,
//           diastolicPressure: 80,
//         },
//         heartRate: 80,
//         respiratoryRate: 20,
//         bodyTemperature: 36,
//         oxygenSaturation: 98,
//       },
//       painLevel: 0,
//       symptoms: '',
//       triageCategory: 'non_urgent',
//     });
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     if (name in formData.vitalSigns) {
//       setFormData({
//         ...formData,
//         vitalSigns: {
//           ...formData.vitalSigns,
//           [name]: Number(value),
//         },
//       });
//     } else if (name === 'systolicPressure' || name === 'diastolicPressure') {
//       setFormData({
//         ...formData,
//         vitalSigns: {
//           ...formData.vitalSigns,
//           bloodPressure: {
//             ...formData.vitalSigns.bloodPressure,
//             [name]: Number(value),
//           },
//         },
//       });
//     } else if (name === 'painLevel') {
//       setFormData({
//         ...formData,
//         painLevel: Number(value),
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Painel da Enfermeira</h1>

//       {loading && <p className="text-blue-600">Carregando...</p>}

//       {/* Fila de Triagem */}
//       <h2 className="text-xl font-semibold mb-2">Fila de Triagem</h2>
//       <div className="bg-gray-100 p-4 rounded mb-4">
//         {triageQueue.length > 0 ? (
//           <ul className="list-disc ml-5">
//             {triageQueue.map((name, index) => (
//               <li key={index}>{name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>Nenhum paciente na fila.</p>
//         )}
//       </div>

//       <button
//         onClick={callNextPatient}
//         className="bg-purple-600 text-white px-4 py-2 rounded mb-6"
//       >
//         Chamar Próximo Paciente
//       </button>

//       {/* Paciente Chamado */}
//       {calledPatient && (
//         <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-4">
//           <h2 className="text-lg font-semibold mb-2">Paciente Chamado:</h2>
//           <p><strong>Nome:</strong> {calledPatient.patient_name}</p>
//           <p><strong>ID do Atendimento:</strong> {calledPatient.careFlow_id}</p>

//           {!formVisible && (
//             <button
//               onClick={iniciarTriagem}
//               className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Iniciar Triagem
//             </button>
//           )}
//         </div>
//       )}

//       {/* Formulário de Triagem */}
//       {formVisible && (
//         <form className="flex flex-col gap-2 bg-white p-4 rounded border border-gray-300">
//           <h2 className="text-xl font-semibold">Formulário de Triagem</h2>

//           <label>Pressão Sistólica</label>
//           <input type="number" name="systolicPressure" onChange={handleChange} value={formData.vitalSigns.bloodPressure.systolicPressure} />

//           <label>Pressão Diastólica</label>
//           <input type="number" name="diastolicPressure" onChange={handleChange} value={formData.vitalSigns.bloodPressure.diastolicPressure} />

//           <label>Frequência Cardíaca</label>
//           <input type="number" name="heartRate" onChange={handleChange} value={formData.vitalSigns.heartRate} />

//           <label>Frequência Respiratória</label>
//           <input type="number" name="respiratoryRate" onChange={handleChange} value={formData.vitalSigns.respiratoryRate} />

//           <label>Temperatura Corporal</label>
//           <input type="number" step="0.1" name="bodyTemperature" onChange={handleChange} value={formData.vitalSigns.bodyTemperature} />

//           <label>Saturação de Oxigênio</label>
//           <input type="number" name="oxygenSaturation" onChange={handleChange} value={formData.vitalSigns.oxygenSaturation} />

//           <label>Nível de Dor (0 a 10)</label>
//           <input type="number" name="painLevel" min={0} max={10} onChange={handleChange} value={formData.painLevel} />

//           <label>Sintomas (separados por vírgula)</label>
//           <input type="text" name="symptoms" onChange={handleChange} value={formData.symptoms} />

//           <label>Classificação de Risco</label>
//           <select name="triageCategory" value={formData.triageCategory} onChange={handleChange}>
//             <option value="non_urgent">Pouco Urgente</option>
//             <option value="urgent">Urgente</option>
//             <option value="very_urgent">Muito Urgente</option>
//             <option value="emergency">Emergência</option>
//           </select>

//           <button
//             type="button"
//             onClick={finalizarTriagem}
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Finalizar Triagem
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }


//separar por seçoes,iniciar triagem
//realizar triagem
//ver fila da triagem
//alterar classificaçao de risco(fila da consulta)
//botao de chamar o proximo o botao fica em realizar triagem,e o de iniciar triagem fica em uma notificaço 
//com o botao iniciar triagem e ao cliar,expande o formuario e o botao vira de finalizar
