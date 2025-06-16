
// app/recepcionista/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RecepcionistaPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, []);

  return <div>Painel do Recepcionista</div>;
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
