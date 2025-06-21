'use client';

import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    name: "",
    cpf: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    workShift: "", // ENUM
    status: "", // ENUM
    salary: "",
    cnesCode: "",
    acessLevel: "",
    weeklyHours: "",
    department: "",
    crm: "",
    coren: "",
    specialty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    const payload = {
      ...formData,
      salary: Number(formData.salary),
      weeklyHours: Number(formData.weeklyHours),
      registrationNumber: Number(formData.registrationNumber),
      role: formData.acessLevel, // campo que backend espera
    };

    try {
      const response = await fetch("http://localhost:3333/employee/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      alert(result.message || "Funcionário cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar funcionário.");
    }
  };

  const { acessLevel } = formData;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <div>
        <label>Número de Registro</label>
        <input name="registrationNumber" type="number" onChange={handleChange} required />
      </div>

      <div>
        <label>Nome</label>
        <input name="name" onChange={handleChange} required />
      </div>

      <div>
        <label>CPF</label>
        <input name="cpf" onChange={handleChange} required />
      </div>

      <div>
        <label>Email</label>
        <input name="email" type="email" onChange={handleChange} required />
      </div>

      <div>
        <label>Telefone</label>
        <input name="phone" type="tel" onChange={handleChange} required />
      </div>

      <div>
        <label>Data de Nascimento</label>
        <input name="dob" type="date" onChange={handleChange} required />
      </div>

      <div>
        <label>Endereço</label>
        <input name="address" onChange={handleChange} required />
      </div>

      <div>
        <label>Turno</label>
        <select name="workShift" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="night">Noite</option>
          <option value="full-time">Integral</option>
        </select>
      </div>

      <div>
        <label>Status</label>
        <select name="status" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="active">Ativo</option>
          <option value="on_leave">Afastado</option>
          <option value="resigned">Inativo</option>
        </select>
      </div>

      <div>
        <label>Salário</label>
        <input name="salary" type="number" onChange={handleChange} required />
      </div>

      <div>
        <label>Código CNES</label>
        <input name="cnesCode" onChange={handleChange} required />
      </div>

      <div>
        <label>Horas Semanais</label>
        <input name="weeklyHours" type="number" onChange={handleChange} required />
      </div>

      <div>
        <label>Cargo</label>
        <select name="acessLevel" value={acessLevel} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="admin">Admin</option>
          <option value="doctor">Médico</option>
          <option value="nurse">Enfermeiro</option>
          <option value="receptionist">Recepcionista</option>
        </select>
      </div>

      {acessLevel === "doctor" && (
        <>
          <div>
            <label>CRM</label>
            <input name="crm" onChange={handleChange} required />
          </div>
          <div>
            <label>Especialidade</label>
            <input name="specialty" onChange={handleChange} required />
          </div>
        </>
      )}

      {acessLevel === "nurse" && (
        <>
          <div>
            <label>COREN</label>
            <input name="coren" onChange={handleChange} required />
          </div>
          <div>
            <label>Departamento</label>
            <input name="department" onChange={handleChange} required />
          </div>
          <div>
            <label>Especialidade</label>
            <input name="specialty" onChange={handleChange} required />
          </div>
        </>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Cadastrar Funcionário
      </button>
    </form>
  );
}
