'use client'

import { useState } from 'react'
import api from '@/app/services/api'

type AttendResponse = {
  attend: {
    ticket: string
    recepcionist_id: number
  }
  patient: {
    name: string
    dob: string
    maritalStatus: string
    cpf: string
    rg: string
    contacts: string[]
    gender: string
    healthPlan: string
    address: string
  }
}

export default function FilaAtendimento() {
  const [data, setData] = useState<AttendResponse | null>(null)

  const fetchNextPatient = async () => {
    try {
      const response = await api.get('/queue/attend')
      console.log('Resposta da API', response.data)
      setData(response.data)
    } catch (error) {
      console.error('Erro ao buscar paciente:', error)
    }
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Fila de Atendimento</h1>

      <button
        onClick={fetchNextPatient}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Chamar próximo paciente
      </button>

      {/* Mensagem inicial */}
      {data === null && (
        <p className="mt-6 text-gray-500">Clique no botão para chamar o próximo paciente.</p>
      )}

      {/* Caso não haja paciente */}
      {data && !data.patient && (
        <p className="mt-6 text-red-600">Nenhum paciente na fila.</p>
      )}

      {/* Exibir informações do paciente */}
      {data?.patient && data?.attend && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Próximo paciente:</h2>
          <p><strong>Nome:</strong> {data.patient.name}</p>
          <p><strong>Data de nascimento:</strong> {new Date(data.patient.dob).toLocaleDateString()}</p>
          <p><strong>CPF:</strong> {data.patient.cpf}</p>
          <p><strong>RG:</strong> {data.patient.rg}</p>
          <p><strong>Gênero:</strong> {data.patient.gender}</p>
          <p><strong>Plano de Saúde:</strong> {data.patient.healthPlan}</p>
          <p><strong>Endereço:</strong> {data.patient.address}</p>
          <p><strong>Contato:</strong> {data.patient.contacts.join(', ')}</p>
          <p><strong>Estado Civil:</strong> {data.patient.maritalStatus}</p>
          <p><strong>Senha:</strong> {data.attend.ticket}</p>
          <p><strong>Recepcionista ID:</strong> {data.attend.recepcionist_id}</p>

          {/* Botão de reset */}
          <button
            onClick={() => setData(null)}
            className="mt-4 text-sm text-blue-500 hover:underline"
          >
            Limpar dados
          </button>
        </div>
      )}
    </main>
  )
}
