"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({

    registrationNumber:"",
    name: "",
    cpf: "",
    email:"",
    phone: "",
    dob:"",
    address: "",
    workShift:"",//ENUM(MANHA, TARDE, NOITE)
    status:"", //ENUM(ATVO, AFASTADO, INATIVO)
    salary:"",
    cnesCode:"",
    acessLevel:"",
    weeklyHours:"",
    department:"",
    crm: "",
    coren: "",
    specialty:"",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData,[name]:value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const playload = {
        ...formData,
        salary:Number(formData.salary),
        weeklyHours:Number(formData.weeklyHours),
        registrationNumber:Number(formData.registrationNumber),
        role:formData.acessLevel,
    };

    try {
      const response = await fetch("http://localhost:3333/employee/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playload),
      });

      const result = await response.json();
      alert(result.message || "Funcionário cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar funcionário.");
    }
  };
  const {acessLevel} = formData;

  return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
        <div>
            <label>Número de Registro</label>
            <input name="registrationNumber" type="number" onChange={handleChange} required/>
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
            <select name="workShift" onChange={handleChange} required >
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
                <option value="onLeave">Afastado</option>
                <option value="inactive">Inativo</option>
            </select>
        </div>

        <div>
            <label>Salário</label>
            <input name="salary" type="number"onChange={handleChange} required />
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
            <div>
                <div>
                    <label>CRM</label>
                    <input name="crm" onChange={handleChange}required/>
                </div>
                <div>
                    <label>Especialidade</label>
                    <input name="specialty" onChange={handleChange}required/>
                </div>
            </div>
        )}

        {acessLevel === "nurse" && (
            <div>
                <div>
                    <label>COREN</label>
                    <input name="coren" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Departamento</label>
                    <input name="department" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Especialidade</label>
                    <input name="specialty" onChange={handleChange} required/>
                </div>
            </div>
            )}

            <button type="submit">Cadastrar Funcionário</button>
        </form>
    );
    }

//-----------------------------------------------------
// "use client";

// import { useState } from "react";

// export default function RegisterForm() {
//   const [role, setRole] = useState("");
//   const [formData, setFormData] = useState({
//     registrationNumber:"",
//     name: "",
//     cpf: "",
//     email:"",
//     phone: "",
//     dob:"",
//     address: "",
//     workShift:"",//ENUM(MANHA, TARDE, NOITE)
//     status:"", //ENUM(ATVO, AFASTADO, INATIVO)
//     salary:"",
//     cnesCode:"",
//     acessLevel:"",
//     weeklyHours:"",
//     department:"",
//     crm: "",
//     coren: "",
//     specialty:"",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3333/employee/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, role }),
//       });

//       const result = await response.json();
//       alert(result.message || "Funcionário cadastrado com sucesso!");
//     } catch (err) {
//       alert("Erro ao cadastrar funcionário.");
//     }
//   };

//   return (
//         <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
//         <div>
//             <label>Número de Registro</label>
//             <input name="registrationNumber" onChange={handleChange} required/>
//         </div>

//         <div>
//             <label>Nome</label>
//             <input name="name" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>CPF</label>
//             <input name="cpf" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Email</label>
//             <input name="email" type="email" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Telefone</label>
//             <input name="phone" type="tel" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Data de Nascimento</label>
//             <input name="dob" type="date" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Endereço</label>
//             <input name="address" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Turno</label>
//         </div>

//         <div>
//             <label>Status</label>
//         </div>

//         <div>
//             <label>Salário</label>
//             <input name="salary" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Código CNES</label>
//             <input name="address" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Horas Semanais</label>
//             <input name="address" onChange={handleChange} required />
//         </div>

//         <div>
//             <label>Cargo</label>
//             <select value={role} onChange={(e) => setRole(e.target.value)} required>
//             <option value="">Selecione</option>
//             <option value="admin">Admin</option>
//             <option value="doctor">Médico</option>
//             <option value="nurse">Enfermeiro</option>
//             <option value="receptionist">Recepcionista</option>
//             </select>
//         </div>    

//         {role === "doctor" && (
//         <div className="mt-4">
//             <div className="flex flex-col mb-4">
//             <label htmlFor="crm" className="mb-1 font-medium">CRM</label>
//             <input
//                 id="crm"
//                 name="crm"
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded"
//             />
//             </div>
//             <div className="flex flex-col mb-4">
//             <label htmlFor="specialty" className="mb-1 font-medium">Especialidade</label>
//             <input
//                 id="specialty"
//                 name="specialty"
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded"
//             />
//             </div>
//         </div>
//         )}


//         {role === "nurse" && (
//             <div className="mt-4">
//             <div className="flex flex-col mb-4">
//             <label htmlFor="COREN" className="mb-1 font-medium">COREN</label>
//             <input
//                 id="coren"
//                 name="coren"
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded"
//             />
//             </div>
//             <div className="flex flex-col mb-4">
//             <label htmlFor="Departamento" className="mb-1 font-medium">Departamento</label>
//             <input
//                 id="departiment"
//                 name="departiment"
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded"
//             />
//             </div>
//             <div className="flex flex-col mb-4">
//             <label htmlFor="Especialidade" className="mb-1 font-medium">Especialidade</label>
//             <input
//                 id="specialty"
//                 name="specialty"
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded"
//             />
//             </div>
//         </div>
//         )}

//         <button type="submit">Cadastrar Funcionário</button>
//         </form>
//     );
//     }

//--------------------------------

// "use client";

// import { useState } from "react";

// export default function RegisterForm() {
//   const [role, setRole] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     birthDate: "",
//     phone: "",
//     crm: "",
//     coren: "",
//     cpf: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3333/employee/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, role }),
//       });

//       const result = await response.json();
//       alert(result.message || "Funcionário cadastrado com sucesso!");
//     } catch (err) {
//       alert("Erro ao cadastrar funcionário.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
//       <div>
//         <label>Nome</label>
//         <input name="name" onChange={handleChange} required />
//       </div>

//       <div>
//         <label>Email</label>
//         <input name="email" type="email" onChange={handleChange} required />
//       </div>

//       <div>
//         <label>Data de Nascimento</label>
//         <input name="birthDate" type="date" onChange={handleChange} required />
//       </div>

//       <div>
//         <label>Telefone</label>
//         <input name="phone" onChange={handleChange} required />
//       </div>

//       <div>
//         <label>Cargo</label>
//         <select value={role} onChange={(e) => setRole(e.target.value)} required>
//           <option value="">Selecione</option>
//           <option value="admin">Admin</option>
//           <option value="doctor">Médico</option>
//           <option value="nurse">Enfermeiro</option>
//           <option value="receptionist">Recepcionista</option>
//         </select>
//       </div>

//       {role === "doctor" && (
//         <div>
//           <label>CRM</label>
//           <input name="crm" onChange={handleChange} required />
//         </div>
//       )}

//       {role === "nurse" && (
//         <div>
//           <label>COREN</label>
//           <input name="coren" onChange={handleChange} required />
//         </div>
//       )}

//       {role === "receptionist" && (
//         <div>
//           <label>CPF</label>
//           <input name="cpf" onChange={handleChange} required />
//         </div>
//       )}

//       <button type="submit">Cadastrar Funcionário</button>
//     </form>
//   );
// }
