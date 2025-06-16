'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ReceptionistPage() {
  const { role, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'receptionist') {
      alert('Acesso não autorizado!');
      logout();
    }
  }, [role, logout, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">
        ✅ Você está na área de recepcionista!
      </h1>
    </main>
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
