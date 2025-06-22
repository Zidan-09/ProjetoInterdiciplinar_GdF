'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NursePage() {
  const router = useRouter();

  const [triageQueue, setTriageQueue] = useState<string[]>([]);
  const [consultQueue, setConsultQueue] = useState<string[]>([]);
  const [calledPatient, setCalledPatient] = useState<{
    patient_name: string;
    careFlow_id: number;
  } | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vitalSigns: {
      bloodPressure: {
        systolicPressure: 120,
        diastolicPressure: 80,
      },
      heartRate: 80,
      respiratoryRate: 20,
      bodyTemperature: 36,
      oxygenSaturation: 98,
    },
    painLevel: 0,
    symptoms: '',
    triageCategory: 'non_urgent',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role?.toLowerCase() !== 'nurse') {
      alert('Acesso não autorizado. Redirecionando...');
      router.push('/login');
    } else {
      fetchQueue();
      fetchConsultQueue();
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
      if (result.status && result.data) {
        setTriageQueue(result.data);
      }
    } catch (err) {
      console.error('Erro ao buscar fila de triagem:', err);
    }
  };

  const fetchConsultQueue = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3333/queue/byName/consult', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status && result.data) {
        setConsultQueue(result.data);
      }
    } catch (err) {
      console.error('Erro ao buscar fila de consulta:', err);
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
        const { patient_name, careFlow_id } = result.data;
        localStorage.setItem('careFlow_id', careFlow_id.toString());
        setCalledPatient({ patient_name, careFlow_id });
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
      if (result.status) {
        setFormVisible(true);
      } else {
        alert('Erro ao iniciar triagem');
      }
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
        ...formData.vitalSigns,
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      alert(result.message);

      setFormVisible(false);
      setCalledPatient(null);
      resetForm();
      fetchQueue();
      fetchConsultQueue();
    } catch (err) {
      console.error(err);
      alert('Erro ao finalizar triagem');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      vitalSigns: {
        bloodPressure: {
          systolicPressure: 120,
          diastolicPressure: 80,
        },
        heartRate: 80,
        respiratoryRate: 20,
        bodyTemperature: 36,
        oxygenSaturation: 98,
      },
      painLevel: 0,
      symptoms: '',
      triageCategory: 'non_urgent',
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name in formData.vitalSigns) {
      setFormData({
        ...formData,
        vitalSigns: {
          ...formData.vitalSigns,
          [name]: Number(value),
        },
      });
    } else if (name === 'systolicPressure' || name === 'diastolicPressure') {
      setFormData({
        ...formData,
        vitalSigns: {
          ...formData.vitalSigns,
          bloodPressure: {
            ...formData.vitalSigns.bloodPressure,
            [name]: Number(value),
          },
        },
      });
    } else if (name === 'painLevel') {
      setFormData({
        ...formData,
        painLevel: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel da Enfermeira</h1>

      {loading && <p className="text-blue-600">Carregando...</p>}

      {/* Fila de Triagem */}
      <h2 className="text-xl font-semibold mb-2">Fila de Triagem</h2>
      <div className="bg-gray-100 p-4 rounded mb-4">
        {triageQueue.length > 0 ? (
          <ul className="list-disc ml-5">
            {triageQueue.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum paciente na fila.</p>
        )}
      </div>

      <button
        onClick={callNextPatient}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-6"
      >
        Chamar Próximo Paciente
      </button>

      {/* Paciente Chamado */}
      {calledPatient && (
        <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-4">
          <h2 className="text-lg font-semibold mb-2">Paciente Chamado:</h2>
          <p><strong>Nome:</strong> {calledPatient.patient_name}</p>
          <p><strong>ID do Atendimento:</strong> {calledPatient.careFlow_id}</p>

          {!formVisible && (
            <button
              onClick={iniciarTriagem}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Iniciar Triagem
            </button>
          )}
        </div>
      )}

      {/* Formulário de Triagem */}
      {formVisible && (
        <form className="flex flex-col gap-2 bg-white p-4 rounded border border-gray-300">
          <h2 className="text-xl font-semibold">Formulário de Triagem</h2>

          <label>Pressão Sistólica</label>
          <input type="number" name="systolicPressure" onChange={handleChange} value={formData.vitalSigns.bloodPressure.systolicPressure} />

          <label>Pressão Diastólica</label>
          <input type="number" name="diastolicPressure" onChange={handleChange} value={formData.vitalSigns.bloodPressure.diastolicPressure} />

          <label>Frequência Cardíaca</label>
          <input type="number" name="heartRate" onChange={handleChange} value={formData.vitalSigns.heartRate} />

          <label>Frequência Respiratória</label>
          <input type="number" name="respiratoryRate" onChange={handleChange} value={formData.vitalSigns.respiratoryRate} />

          <label>Temperatura Corporal</label>
          <input type="number" step="0.1" name="bodyTemperature" onChange={handleChange} value={formData.vitalSigns.bodyTemperature} />

          <label>Saturação de Oxigênio</label>
          <input type="number" name="oxygenSaturation" onChange={handleChange} value={formData.vitalSigns.oxygenSaturation} />

          <label>Nível de Dor (0 a 10)</label>
          <input type="number" name="painLevel" min={0} max={10} onChange={handleChange} value={formData.painLevel} />

          <label>Sintomas (separados por vírgula)</label>
          <input type="text" name="symptoms" onChange={handleChange} value={formData.symptoms} />

          <label>Classificação de Risco</label>
          <select name="triageCategory" value={formData.triageCategory} onChange={handleChange}>
            <option value="non_urgent">Pouco Urgente</option>
            <option value="urgent">Urgente</option>
            <option value="very_urgent">Muito Urgente</option>
            <option value="emergency">Emergência</option>
          </select>

          <button
            type="button"
            onClick={finalizarTriagem}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Finalizar Triagem
          </button>
        </form>
      )}

      {/* Fila de Consulta */}
      <h2 className="text-xl font-semibold mt-6">Fila de Consulta</h2>
      <div className="bg-gray-100 p-4 rounded mb-4">
        {consultQueue.length > 0 ? (
          <ul className="list-disc ml-5">
            {consultQueue.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum paciente aguardando consulta.</p>
        )}
      </div>
    </div>
  );
}


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
//       console.error('Erro ao buscar fila:', err);
//     }
//   };

//   const callNextPatient = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

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
//   };

//   const iniciarTriagem = async () => {
//     const token = localStorage.getItem('token');
//     const careFlow_id = calledPatient?.careFlow_id;
//     if (!token || !careFlow_id) return;

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
//     } catch (err) {
//       console.error(err);
//       alert('Erro ao finalizar triagem');
//     }
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




//-------------------------------------
// 'use client';
// import { useAuth } from '../utils/authRedirect';

// export default function NursePage() {
//   useAuth('nurse');

//   return <h1>Bem-vindo ao Painel da Mãe do Trunks</h1>;
// ;
// Triagem:
// Botao:Iniciar triagem
// Ao apertar botao envia um GET para http:/hospital/triageInit:careflowid
// iniciou triagem
// Ai abre o formulario
// preenche o formulario
// envia(finalizar triagem)
// manda um POST para http:/hospital/triageEnd
// Visualiza a fila da triagem
// Alterar classificaçao de risco
// chama o proximo