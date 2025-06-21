'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NursePage() {
  const router = useRouter();
  const [careFlowId, setCareFlowId] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [calledPatient, setCalledPatient] = useState<any | null>(null);

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
    }
  }, []);

  const callNextPatient = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Chama o próximo paciente da fila de triagem
      const triageResponse = await fetch('http://localhost:3333/queue/call/triage', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const triageData = await triageResponse.json();

      if (triageData.status && triageData.data?.patient_id) {
        // OBS: se o backend já retorna tudo que precisa, use direto
        setCalledPatient({
          id: triageData.data.patient_id,
          name: triageData.data.patient_name,
          // adicionar outros campos se o backend fornecer
        });
        setCareFlowId(triageData.data.pointer); // ou patient_id se não tiver pointer
      } else {
        alert('Nenhum paciente na fila de triagem.');
      }
    } catch (err) {
      console.error('Erro ao chamar paciente:', err);
      alert('Erro ao chamar próximo paciente.');
    }
  };

  const iniciarTriagem = async () => {
    if (!careFlowId) {
      alert('Nenhum atendimento selecionado.');
      return;
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3333/hospital/triageInit/${careFlowId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data.status) setFormVisible(true);
    else alert(data.message || 'Erro ao iniciar triagem.');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name in formData.vitalSigns) {
      setFormData({
        ...formData,
        vitalSigns: { ...formData.vitalSigns, [name]: value },
      });
    } else if (name in formData.vitalSigns.bloodPressure) {
      setFormData({
        ...formData,
        vitalSigns: {
          ...formData.vitalSigns,
          bloodPressure: { ...formData.vitalSigns.bloodPressure, [name]: value },
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const finalizarTriagem = async () => {
    if (!careFlowId) {
      alert('ID do atendimento não encontrado.');
      return;
    }

    const payload = {
      ...formData,
      symptoms: formData.symptoms.split(',').map((s) => s.trim()),
    };

    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3333/hospital/triageEnd/${careFlowId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    alert(data.message);
    setFormVisible(false);
    setCalledPatient(null);
    setCareFlowId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel da Enfermeira</h1>

      {!calledPatient && (
        <button
          onClick={callNextPatient}
          className="mb-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Chamar Próximo Paciente
        </button>
      )}

      {calledPatient && !formVisible && (
        <div className="mb-4 space-y-1">
          <h2 className="text-xl font-semibold">Paciente Chamado:</h2>
          <p><strong>Nome:</strong> {calledPatient.name}</p>
          <p><strong>ID:</strong> {calledPatient.id}</p>

          <button
            onClick={iniciarTriagem}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Iniciar Triagem
          </button>
        </div>
      )}

      {formVisible && (
        <form className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Formulário de Triagem</h2>

          <label>Pressão Sistólica</label>
          <input name="systolicPressure" type="number" onChange={handleChange} value={formData.vitalSigns.bloodPressure.systolicPressure} />

          <label>Pressão Diastólica</label>
          <input name="diastolicPressure" type="number" onChange={handleChange} value={formData.vitalSigns.bloodPressure.diastolicPressure} />

          <label>Frequência Cardíaca</label>
          <input name="heartRate" type="number" onChange={handleChange} value={formData.vitalSigns.heartRate} />

          <label>Frequência Respiratória</label>
          <input name="respiratoryRate" type="number" onChange={handleChange} value={formData.vitalSigns.respiratoryRate} />

          <label>Temperatura Corporal</label>
          <input name="bodyTemperature" type="number" onChange={handleChange} value={formData.vitalSigns.bodyTemperature} />

          <label>Saturação de Oxigênio</label>
          <input name="oxygenSaturation" type="number" onChange={handleChange} value={formData.vitalSigns.oxygenSaturation} />

          <label>Nível de Dor (0 a 10)</label>
          <input name="painLevel" type="number" onChange={handleChange} value={formData.painLevel} />

          <label>Sintomas (separados por vírgula)</label>
          <input name="symptoms" onChange={handleChange} value={formData.symptoms} />

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
    </div>
  );
}



// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function NursePage() {
//   const router = useRouter();
//   const [careFlowId, setCareFlowId] = useState<number | null>(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [calledPatient, setCalledPatient] = useState<any | null>(null);
//   const [formData, setFormData] = useState({
//     vitalSigns: {
//       bloodPreassure: {
//         systolicPreassure: 120,
//         diastolicPreassure: 80,
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
//     }
//   }, []);

//   const callNextPatient = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch('http://localhost:3333/queue/call/nurse', {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const result = await response.json();
//       if (result.status && result.data) {
//         setCalledPatient(result.data);
//         setCareFlowId(result.data.careFlow_id); // Aqui pegamos o ID do atendimento
//       } else {
//         alert("Nenhum paciente na fila");
//       }
//     } catch (err) {
//       console.error('Erro ao chamar paciente:', err);
//       alert("Erro ao chamar próximo paciente");
//     }
//   };

//   const iniciarTriagem = async () => {
//     if (!careFlowId) {
//       alert("Nenhum atendimento selecionado. Chame um paciente primeiro.");
//       return;
//     }

//     const token = localStorage.getItem('token');
//     const response = await fetch(`http://localhost:3333/hospital/triageInit/${careFlowId}`, {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = await response.json();
//     if (data.status) {
//       setFormVisible(true);
//     }
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     if (name in formData.vitalSigns) {
//       setFormData({
//         ...formData,
//         vitalSigns: { ...formData.vitalSigns, [name]: value },
//       });
//     } else if (name in formData.vitalSigns.bloodPreassure) {
//       setFormData({
//         ...formData,
//         vitalSigns: {
//           ...formData.vitalSigns,
//           bloodPreassure: { ...formData.vitalSigns.bloodPreassure, [name]: value },
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const finalizarTriagem = async () => {
//     if (!careFlowId) {
//       alert('ID do atendimento não encontrado.');
//       return;
//     }

//     const payload = {
//       ...formData,
//       symptoms: formData.symptoms.split(',').map((s) => s.trim()),
//     };

//     const token = localStorage.getItem('token');
//     const response = await fetch(`http://localhost:3333/hospital/triageEnd/${careFlowId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();
//     alert(data.message);
//     setFormVisible(false);
//     setCalledPatient(null);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Painel da Enfermeira</h1>

//       {!calledPatient && (
//         <button
//           onClick={callNextPatient}
//           className="mb-4 px-4 py-2 bg-purple-600 text-white rounded"
//         >
//           Chamar Próximo Paciente
//         </button>
//       )}

//       {calledPatient && !formVisible && (
//         <div className="mb-4">
//           <p className="font-semibold">Paciente: {calledPatient.name}</p>
//           <button
//             onClick={iniciarTriagem}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Iniciar Triagem
//           </button>
//         </div>
//       )}

//       {formVisible && (
//         <form className="flex flex-col gap-2">
//           <h2 className="text-xl font-semibold">Formulário de Triagem</h2>

//           <label>Pressão Sistólica</label>
//           <input name="systolicPreassure" onChange={handleChange} value={formData.vitalSigns.bloodPreassure.systolicPreassure} />

//           <label>Pressão Diastólica</label>
//           <input name="diastolicPreassure" onChange={handleChange} value={formData.vitalSigns.bloodPreassure.diastolicPreassure} />

//           <label>Frequência Cardíaca</label>
//           <input name="heartRate" onChange={handleChange} value={formData.vitalSigns.heartRate} />

//           <label>Frequência Respiratória</label>
//           <input name="respiratoryRate" onChange={handleChange} value={formData.vitalSigns.respiratoryRate} />

//           <label>Temperatura Corporal</label>
//           <input name="bodyTemperature" onChange={handleChange} value={formData.vitalSigns.bodyTemperature} />

//           <label>Saturação de Oxigênio</label>
//           <input name="oxygenSaturation" onChange={handleChange} value={formData.vitalSigns.oxygenSaturation} />

//           <label>Nível de Dor (0 a 10)</label>
//           <input name="painLevel" onChange={handleChange} value={formData.painLevel} />

//           <label>Sintomas (separados por vírgula)</label>
//           <input name="symptoms" onChange={handleChange} value={formData.symptoms} />

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