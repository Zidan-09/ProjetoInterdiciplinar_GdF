'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ClipboardList, List } from 'lucide-react';


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
      <div className="w-64 bg-teal-600 text-white flex flex-col justify-between h-screen">
    <div>
      <div className="flex gap-1 mb-6">
        <img src="/Gemini_Generated_Image_9357q79357q79357.png" alt="Logo" className="h-[150px] w-[150px] ml-2 -mt-3" />
        <h1 className="text-lg uppercase font-bold leading-tight tracking-wide -ml-8 mt-6">
          Sistema<br />GdF
        </h1>
      </div>
          <div className="space-y-2">
            <div onClick={() => setSelectedSection('realizar')} className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-r-full ${selectedSection === 'realizar' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <ClipboardList size={16} /> Realizar Triagem
            </div>
            <div onClick={() => setSelectedSection('fila')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'fila' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <List size={16} /> Ver Fila
            </div>
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
          <h2 className="text-md text-gray-500">Bem vindo Enfermeira(o)! 👋</h2>
          <h2 className="text-3xl font-bold text-gray-800">A TRIAGEM DOS PACIENTES</h2>
        </div>

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

