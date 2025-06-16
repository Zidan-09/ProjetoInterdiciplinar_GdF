// // import { useState } from "react";
// // import { useRouter } from "next/navigation"; // <-- Importa aqui
// // import axios from "@/services/api";

// // const initialStates = {
// //   registrationNumber: '',
// //   name: '',
// //   cpf: '',
// //   email: '',
// //   phone: '',
// //   dob: '',
// //   address: '',
// //   workShift: 'morning',
// //   status: 'active',
// //   salary: '',
// //   cnesCode: '',
// //   accessLevel: '',
// //   weeklyHours: '',
// //   crm: '',
// //   specialty: '',
// //   coren: '',
// //   department: ''
// // };

// // export default function AdminRegister() {
// //   const [formData, setFormData] = useState(initialStates);
// //   const [accessLevel, setAccessLevel] = useState('');
// //   const router = useRouter(); // <-- Aqui

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       const endpoint = `/employee/register`;
// //       const dataToSend = { ...formData, accessLevel };

// //       await axios.post(endpoint, dataToSend);
// //       alert("Funcionário cadastrado com sucesso. Verifique o e-mail para ativar a conta.");

// //       // Redireciona para a página de login
// //       router.push("/login");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Erro ao cadastrar funcionário.");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white text-black rounded shadow">
// //       <h1 className="text-2xl font-bold mb-4">Cadastrar Funcionário</h1>

// //       {/* Campos comuns */}
// //       {Object.keys(initialStates).filter(k => !['crm','coren','department','specialty'].includes(k)).map((key) => (
// //         <input
// //           key={key}
// //           name={key}
// //           value={formData[key as keyof typeof formData]}
// //           onChange={handleChange}
// //           placeholder={key}
// //           className="w-full mb-3 p-2 border rounded"
// //         />
// //       ))}

// //       {/* Tipo do funcionário */}
// //       <select
// //         name="accessLevel"
// //         value={accessLevel}
// //         onChange={(e) => {
// //           setAccessLevel(e.target.value);
// //           setFormData({ ...formData, accessLevel: e.target.value }); // mantém coerência
// //         }}
// //         className="w-full mb-4 p-2 border rounded"
// //         required
// //       >
// //         <option value="">Selecione o tipo</option>
// //         <option value="admin">Admin</option>
// //         <option value="doctor">Médico</option>
// //         <option value="nurse">Enfermeiro</option>
// //         <option value="receptionist">Recepcionista</option>
// //       </select>

// //       {/* Campos extras por tipo */}
// //       {accessLevel === 'doctor' && (
// //         <>
// //           <input
// //             name="crm"
// //             value={formData.crm}
// //             onChange={handleChange}
// //             placeholder="CRM"
// //             className="w-full mb-3 p-2 border rounded"
// //           />
// //           <input
// //             name="specialty"
// //             value={formData.specialty}
// //             onChange={handleChange}
// //             placeholder="Especialidade"
// //             className="w-full mb-3 p-2 border rounded"
// //           />
// //         </>
// //       )}

// //       {accessLevel === 'nurse' && (
// //         <>
// //           <input
// //             name="coren"
// //             value={formData.coren}
// //             onChange={handleChange}
// //             placeholder="COREN"
// //             className="w-full mb-3 p-2 border rounded"
// //           />
// //           <input
// //             name="specialty"
// //             value={formData.specialty}
// //             onChange={handleChange}
// //             placeholder="Especialidade"
// //             className="w-full mb-3 p-2 border rounded"
// //           />
// //           <input
// //             name="department"
// //             value={formData.department}
// //             onChange={handleChange}
// //             placeholder="Departamento"
// //             className="w-full mb-3 p-2 border rounded"
// //           />
// //         </>
// //       )}

// //       <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
// //         Cadastrar Funcionário
// //       </button>
// //     </form>
// //   );
// // }
// import { useState } from "react";
// import { useRouter } from "next/navigation"; // <-- Importa aqui
// import axios from "@/services/api";

// const initialStates = {
//   registrationNumber: '',
//   name: '',
//   cpf: '',
//   email: '',
//   phone: '',
//   dob: '',
//   address: '',
//   workShift: 'morning',
//   status: 'active',
//   salary: '',
//   cnesCode: '',
//   accessLevel: '',
//   weeklyHours: '',
//   crm: '',
//   specialty: '',
//   coren: '',
//   department: ''
// };

// export default function AdminRegister() {
//   const [formData, setFormData] = useState(initialStates);
//   const [accessLevel, setAccessLevel] = useState('');
//   const router = useRouter(); // <-- Aqui

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const endpoint = `/employee/register`;
//       const dataToSend = { ...formData, accessLevel };

//       await axios.post(endpoint, dataToSend);
//       alert("Funcionário cadastrado com sucesso. Verifique o e-mail para ativar a conta.");

//       // Redireciona para a página de login
//       router.push("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao cadastrar funcionário.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white text-black rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Cadastrar Funcionário</h1>

//       {/* Campos comuns */}
//       {Object.keys(initialStates).filter(k => !['crm','coren','department','specialty'].includes(k)).map((key) => (
//         <input
//           key={key}
//           name={key}
//           value={formData[key as keyof typeof formData]}
//           onChange={handleChange}
//           placeholder={key}
//           className="w-full mb-3 p-2 border rounded"
//         />
//       ))}

//       {/* Tipo do funcionário */}
//       <select
//         name="accessLevel"
//         value={accessLevel}
//         onChange={(e) => {
//           setAccessLevel(e.target.value);
//           setFormData({ ...formData, accessLevel: e.target.value }); // mantém coerência
//         }}
//         className="w-full mb-4 p-2 border rounded"
//         required
//       >
//         <option value="">Selecione o tipo</option>
//         <option value="admin">Admin</option>
//         <option value="doctor">Médico</option>
//         <option value="nurse">Enfermeiro</option>
//         <option value="receptionist">Recepcionista</option>
//       </select>

//       {/* Campos extras por tipo */}
//       {accessLevel === 'doctor' && (
//         <>
//           <input
//             name="crm"
//             value={formData.crm}
//             onChange={handleChange}
//             placeholder="CRM"
//             className="w-full mb-3 p-2 border rounded"
//           />
//           <input
//             name="specialty"
//             value={formData.specialty}
//             onChange={handleChange}
//             placeholder="Especialidade"
//             className="w-full mb-3 p-2 border rounded"
//           />
//         </>
//       )}

//       {accessLevel === 'nurse' && (
//         <>
//           <input
//             name="coren"
//             value={formData.coren}
//             onChange={handleChange}
//             placeholder="COREN"
//             className="w-full mb-3 p-2 border rounded"
//           />
//           <input
//             name="specialty"
//             value={formData.specialty}
//             onChange={handleChange}
//             placeholder="Especialidade"
//             className="w-full mb-3 p-2 border rounded"
//           />
//           <input
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             placeholder="Departamento"
//             className="w-full mb-3 p-2 border rounded"
//           />
//         </>
//       )}

//       <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
//         Cadastrar Funcionário
//       </button>
//     </form>
//   );
// }
