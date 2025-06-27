// 'use client';

// import { useState } from 'react';

// export default function AdminRegisterEmployee() {
//   const [formData, setFormData] = useState({
//     accessLevel: '',
//     registrationNumber: '',
//     name: '',
//     cpf: '',
//     email: '',
//     phone: '',
//     dob: '',
//     address: '',
//     workShift: '',
//     status: '',
//     salary: '',
//     cnesCode: '',
//     weeklyHours: '',
//     department: '',
//     crm: '',
//     coren: '',
//     specialty: '',
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     let formattedValue = value;

//     if (name === 'cpf') {
//       formattedValue = value
//         .replace(/\D/g, '')
//         .slice(0, 11)
//         .replace(/(\d{3})(\d)/, '$1.$2')
//         .replace(/(\d{3})(\d)/, '$1.$2')
//         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
//     }

//     if (name === 'phone') {
//       formattedValue = value
//         .replace(/\D/g, '')
//         .slice(0, 11)
//         .replace(/(\d{2})(\d)/, '($1) $2')
//         .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
//     }

//     if (name === 'cnesCode') {
//       formattedValue = value
//       .replace(/[^\d]/g, '')
//       .slice(0, 4)
//       .replace(/(\d{2})(\d{0,2})/, '$1-$2');
//     }

//     setFormData({ ...formData, [name]: formattedValue });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('Token de admin não encontrado. Faça login como admin.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const payload: any = {
//         registrationNumber: Number(formData.registrationNumber),
//         name: formData.name,
//         cpf: formData.cpf.replace(/\D/g, ''),
//         email: formData.email,
//         phone: formData.phone.replace(/\D/g, ''),
//         dob: formData.dob,
//         address: formData.address,
//         workShift: formData.workShift,
//         status: formData.status,
//         salary: Number(formData.salary),
//         cnesCode: formData.cnesCode,
//         weeklyHours: Number(formData.weeklyHours),
//         accessLevel: formData.accessLevel,
//       };

//       if (formData.accessLevel === 'doctor') {
//         payload.crm = formData.crm;
//         payload.specialty = formData.specialty;
//       }

//       if (formData.accessLevel === 'nurse') {
//         payload.coren = formData.coren;
//         payload.department = formData.department;
//         payload.specialty = formData.specialty;
//       }

//       const response = await fetch('http://localhost:3333/employee/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (response.ok && result.status) {
//         setMessage('Funcionário cadastrado. Aguardando autenticação via e-mail.');
//       } else {
//         setError(result.message || 'Erro ao cadastrar funcionário.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Erro de conexão com o servidor.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { accessLevel } = formData;

//   return (
//     <div className="max-w-4xl w-full mx-auto ml-71 mt-10 p-6 border rounded shadow bg-white">
//       <h1 className="text-2xl text-black font-bold mb-4">Cadastrar Novo Funcionário</h1>

//       {message && <p className="text-green-600 mb-4">{message}</p>}
//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <select
//           name="accessLevel"
//           onChange={handleChange}
//           required
//           className="text-black w-full border p-2 rounded"
//         >
//           <option value="admin">Admin</option>
//           <option value="doctor">Médico</option>
//           <option value="nurse">Enfermeiro</option>
//           <option value="receptionist">Recepcionista</option>
//         </select>

//         <input name="registrationNumber" placeholder="Número de Registro" type="text" inputMode="numeric" pattern="\d*" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="name" placeholder="Nome" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="cpf" placeholder="CPF (000.000.000-00)" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="phone" placeholder="Telefone ((00) 00000-0000)" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="dob" placeholder="Data de Nascimento" type="date" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="address" placeholder="Endereço" onChange={handleChange} required className="w-full border p-2 rounded" />

//         <select name="workShift" onChange={handleChange} required className="w-full border p-2 rounded">
//           <option value="">Turno</option>
//           <option value="morning">Manhã</option>
//           <option value="afternoon">Tarde</option>
//           <option value="night">Noite</option>
//           <option value="full-time">Integral</option>
//         </select>

//         <select name="status" onChange={handleChange} required className="w-full border p-2 rounded">
//           <option value="">Status</option>
//           <option value="active">Ativo</option>
//           <option value="on_leave">Afastado</option>
//           <option value="resigned">Inativo</option>
//         </select>

//         <input name="salary" placeholder="Salário" type="text" inputMode="decimal" pattern="^\d+(\.\d{0,2})?$" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="cnesCode" placeholder="Código CNES (00-00)" onChange={handleChange} required className="w-full border p-2 rounded" />
//         <input name="weeklyHours" placeholder="Horas Semanais" type="text" inputMode="numeric" pattern="\d*" onChange={handleChange} required className="w-full border p-2 rounded" />

//         {accessLevel === 'doctor' && (
//           <>
//             <input name="crm" placeholder="CRM" onChange={handleChange} required className="w-full border p-2 rounded" />
//             <input name="specialty" placeholder="Especialidade" onChange={handleChange} required className="w-full border p-2 rounded" />
//           </>
//         )}

//         {accessLevel === 'nurse' && (
//           <>
//             <input name="coren" placeholder="COREN" onChange={handleChange} required className="w-full border p-2 rounded" />
//             <input name="department" placeholder="Departamento" onChange={handleChange} required className="w-full border p-2 rounded" />
//             <input name="specialty" placeholder="Especialidade" onChange={handleChange} required className="w-full border p-2 rounded" />
//           </>
//         )}

//         <button type="submit" disabled={loading} className={`w-full px-4 py-2 rounded-full text-white ${loading ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-300'}`}>
//           {loading ? 'Enviando...' : 'Cadastrar Funcionário'}
//         </button>
//       </form>
//     </div>
//   );
// }
