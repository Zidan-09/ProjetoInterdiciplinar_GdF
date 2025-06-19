'use client';

import { useAuth } from '../utils/authRedirect';
import { useState } from 'react';
import PatientRegisterForm from './components/patientRegister';

export default function ReceptionistPage() {
  useAuth('receptionist');
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel da Recepção</h1>

      <button
        onClick={toggleForm}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Fechar Cadastro' : 'Cadastrar Novo Paciente'}
      </button>

      {showForm && (
        <div className="mt-4">
          <PatientRegisterForm />
        </div>
      )}
    </div>
  );
}
