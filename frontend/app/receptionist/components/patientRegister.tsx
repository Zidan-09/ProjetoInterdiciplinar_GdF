"use client"

import { useState } from "react"

export default function PatientRegisterForm() {
    const [formData,setFormData] = useState({
        name:"",
        dob:"",
        maritalStatus:"",
        cpf:"",
        rg:"",
        contact:"",
        gender:"",
        healthPlan:"",
        address:"",
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
        const {name, value} = e.target;
        setFormData({...formData,[name]:value});
    };

    const handleSubmit = async(e: React.FormEvent)=> {
        e.preventDefault();

        try {
            const response = await fetch("host://localhost:3333/patient/register",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            alert(result.message || 'Paciente cadastrado com sucesso!');
            } catch (err) {
            alert('Erro ao cadastrar paciente.');
            }
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Cadastro de Paciente</h2>

      <div>
        <label>Nome</label>
        <input name="name" onChange={handleChange} required />
      </div>

      <div>
        <label>Data de Nascimento</label>
        <input name="dob" type="date" onChange={handleChange} required />
      </div>

      <div>
        <label>Estado Civil</label>
        <select name="maritalStatus" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Single">Solteiro(a)</option>
          <option value="Married">Casado(a)</option>
          <option value="Divorced">Divorciado(a)</option>
          <option value="Widowed">Viúvo(a)</option>
        </select>
      </div>

      <div>
        <label>CPF</label>
        <input name="cpf" onChange={handleChange} required />
      </div>

      <div>
        <label>RG</label>
        <input name="rg" onChange={handleChange} required />
      </div>

      <div>
        <label>Contato</label>
        <input name="contact" onChange={handleChange} required />
      </div>

      <div>
        <label>Gênero</label>
        <select name="gender" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Male">Masculino</option>
          <option value="Female">Feminino</option>
          <option value="Other">Outro</option>
        </select>
      </div>

      <div>
        <label>Plano de Saúde</label>
        <select name="healthPlan" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Sus">SUS</option>
          <option value="Unimed">Unimed</option>
          <option value="Particular">Particular</option>
        </select>
      </div>

      <div>
        <label>Endereço</label>
        <input name="address" onChange={handleChange} required />
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Cadastrar Paciente
      </button>
    </form>
  );
}