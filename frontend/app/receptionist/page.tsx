
'use client';

import { useAuth } from "../context/AuthContext";

export default function ReceptionistPage() {
  const { user, role } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Painel da Recepção</h1>
      <p>Bem-vindo, {user}! Seu papel é: {role}</p>
    </div>
  );
}

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ReceptionistPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const accessLevel = localStorage.getItem('accessLevel');

//     if (!token || accessLevel !== 'receptionist') {
//       router.push('/login');
//     }
//   }, []);

//   return (
//     <div className="p-10 text-center text-2xl text-green-700">
//       Bem-vindo à área da Recepção!
//     </div>
//   );
// }
