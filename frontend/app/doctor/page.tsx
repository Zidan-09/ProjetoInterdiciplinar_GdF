'use client';

import { useState } from 'react';

interface QueueData {
  careFlow_id: number;
  patient_name: string;
  triage: {
    vitalSigns: {
      bloodPressure: {
        systolicPressure: number;
        diastolicPressure: number;
      };
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
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [consultStarted, setConsultStarted] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem('token');

  const callNextPatient = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const token = getToken();
      if (!token) throw new Error('Token não encontrado. Faça login novamente.');

      const response = await fetch('http://localhost:3333/queue/call/consult', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok && result.status) {
        setQueueData(result.data);
      } else {
        setError(result.message || 'Erro ao chamar próximo paciente.');
      }
    } catch (err) {
      console.error(err);
      setError('Falha ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const startConsult = async () => {
    if (!queueData) return;

    setLoading(true);
    setMessage('');
    setError('');
    try {
      const token = getToken();
      if (!token) throw new Error('Token não encontrado. Faça login novamente.');

      const response = await fetch(`http://localhost:3333/hospital/consultInit/${queueData.careFlow_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok && result.status) {
        setConsultStarted(true);
        setMessage('Consulta iniciada.');
      } else {
        setError(result.message || 'Erro ao iniciar consulta.');
      }
    } catch (err) {
      console.error(err);
      setError('Falha ao iniciar consulta.');
    } finally {
      setLoading(false);
    }
  };

  const endConsult = async () => {
    if (!queueData) return;

    setLoading(true);
    setMessage('');
    setError('');
    try {
      const token = getToken();
      if (!token) throw new Error('Token não encontrado. Faça login novamente.');

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
      if (response.ok && result.status) {
        setMessage('Consulta finalizada com sucesso.');
        setQueueData(null);
        setConsultStarted(false);
        setDiagnosis('');
        setPrescriptions([]);
        setNotes('');
      } else {
        setError(result.message || 'Erro ao finalizar consulta.');
      }
    } catch (err) {
      console.error(err);
      setError('Falha ao finalizar consulta.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrescription = (prescription: string) => {
    if (prescription.trim() !== '') {
      setPrescriptions([...prescriptions, prescription]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Atendimento Médico</h1>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!queueData && (
        <button
          onClick={callNextPatient}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Chamando...' : 'Chamar Próximo Paciente'}
        </button>
      )}

      {queueData && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Paciente: {queueData.patient_name}</h2>
          <p><strong>Pressão:</strong> {queueData.triage.vitalSigns.bloodPressure.systolicPressure}/{queueData.triage.vitalSigns.bloodPressure.diastolicPressure}</p>
          <p><strong>Frequência Cardíaca:</strong> {queueData.triage.vitalSigns.heartRate} bpm</p>
          <p><strong>Respiração:</strong> {queueData.triage.vitalSigns.respiratoryRate} rpm</p>
          <p><strong>Temperatura:</strong> {queueData.triage.vitalSigns.bodyTemperature} °C</p>
          <p><strong>Saturação:</strong> {queueData.triage.vitalSigns.oxygenSaturation}%</p>
          <p><strong>Nível de Dor:</strong> {queueData.triage.painLevel}</p>
          <p><strong>Sintomas:</strong> {queueData.triage.symptoms.join(', ')}</p>
          <p><strong>Categoria da Triagem:</strong> {queueData.triage.triageCategory}</p>

          {!consultStarted && (
            <button
              onClick={startConsult}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? 'Iniciando...' : 'Iniciar Consulta'}
            </button>
          )}

          {consultStarted && (
            <div className="space-y-2 mt-4">
              <textarea
                placeholder="Diagnóstico"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                placeholder="Notas/Observações"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <div>
                <input
                  type="text"
                  placeholder="Adicionar Prescrição (ex: Benegripe)"
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
              </div>

              <button
                onClick={endConsult}
                disabled={loading}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {loading ? 'Finalizando...' : 'Finalizar Consulta'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
