// 'use client'

// import axios  from "axios"
// import { headers } from "next/headers";
// import { useState } from "react"

// export default function UserRegisterForm() {
//     const [formData,setFormData] = useState({
//         name:"",
//         email:"",
//         password:"",
//         role:"doctor",
//     });

//     const [message,setMessage] = useState("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({...formData, [e.target.name]: e.target.value});
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const token = localStorage.getItem("token");
//             await axios.post(
//                 "http://localhost:3333/register",
//                 formData, {
//                     headers:{
//                         Authorization :`Bearer ${token}`,
//                     },
//                 }
//             );
//             setMessage('Funcionário Cadastrado com sucesso :)');
//             setFormData({name:"",email:"",password:"",role:"doctor"});
//         } catch (error){
//             console.error(error);
//             setMessage('Erro ao cadastrar Funcionário');
//         }
//         };

//         return (
//             <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//                 <input
//                     type = "text"
//                     name ="name"
//                     placeholder="Nome Completo"
//                     value = {formData.name}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                     required
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                     required
//                 />

//                 <input
//                     type= "password"
//                     name= "password"
//                     placeholder="Senha"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded" 
//                     required
//                 />

//                 <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                 >
//                     <option value="doctor">Médico</option>
//                     <option value="nurse">Enfermeiro</option>
//                     <option value="receptionist">Recepcionista</option>
//                 </select>
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Cadastrar
//                 </button>
//                 {message && <p className="text-sm mt-2">{message}</p>}
//             </form>   
//         );
//     }