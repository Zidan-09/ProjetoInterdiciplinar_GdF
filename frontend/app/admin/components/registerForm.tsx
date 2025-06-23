'use client';

import { useState } from 'react';

export default function AdminRegisterEmployee() {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    cpf: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    workShift: '',
    status: '',
    salary: '',
    cnesCode: '',
    weeklyHours: '',
    accessLevel: '',
    department: '',
    crm: '',
    coren: '',
    specialty: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  // Token do Admin
    if (!token) {
      setError('Token de admin não encontrado. Faça login como admin.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload: any = {
        registrationNumber: Number(formData.registrationNumber),
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        workShift: formData.workShift,
        status: formData.status,
        salary: Number(formData.salary),
        cnesCode: formData.cnesCode,
        weeklyHours: Number(formData.weeklyHours),
        accessLevel: formData.accessLevel,
      };

      // Adicionar campos extras por cargo
      if (formData.accessLevel === 'doctor') {
        payload.crm = formData.crm;
        payload.specialty = formData.specialty;
      }

      if (formData.accessLevel === 'nurse') {
        payload.coren = formData.coren;
        payload.department = formData.department;
        payload.specialty = formData.specialty;
      }

      const response = await fetch('http://localhost:3333/employee/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setMessage('Funcionário cadastrado. Aguardando autenticação via e-mail.');
      } else {
        setError(result.message || 'Erro ao cadastrar funcionário.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const { accessLevel } = formData;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Funcionário</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="registrationNumber" placeholder="Número de Registro" type="number" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="name" placeholder="Nome" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="cpf" placeholder="CPF" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="phone" placeholder="Telefone" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="dob" placeholder="Data de Nascimento" type="date" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="address" placeholder="Endereço" onChange={handleChange} required className="w-full border p-2 rounded" />

        <select name="workShift" onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Turno</option>
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="night">Noite</option>
          <option value="full-time">Integral</option>
        </select>

        <select name="status" onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Status</option>
          <option value="active">Ativo</option>
          <option value="on_leave">Afastado</option>
          <option value="resigned">Inativo</option>
        </select>

        <input name="salary" placeholder="Salário" type="number" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="cnesCode" placeholder="Código CNES" onChange={handleChange} required className="w-full border p-2 rounded" />

        <input name="weeklyHours" placeholder="Horas Semanais" type="number" onChange={handleChange} required className="w-full border p-2 rounded" />

        <select name="accessLevel" onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Cargo</option>
          <option value="admin">Admin</option>
          <option value="doctor">Médico</option>
          <option value="nurse">Enfermeiro</option>
          <option value="receptionist">Recepcionista</option>
        </select>
         //Botar o cargo antes

        {accessLevel === 'doctor' && (
          <>
            <input name="crm" placeholder="CRM" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input name="specialty" placeholder="Especialidade" onChange={handleChange} required className="w-full border p-2 rounded" />
          </>
        )}

        {accessLevel === 'nurse' && (
          <>
            <input name="coren" placeholder="COREN" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input name="department" placeholder="Departamento" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input name="specialty" placeholder="Especialidade" onChange={handleChange} required className="w-full border p-2 rounded" />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Enviando...' : 'Cadastrar Funcionário'}
        </button>
      </form>
    </div>
  );
}


