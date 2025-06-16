// app/admin/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token){router.push('/login')};
  }, []);

  return <div>Painel do Admin</div>;
}

// 'use client';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const accessLevel = localStorage.getItem('accessLevel');

//     if (!token || accessLevel !== 'admin') {
//       router.push('/login');
//     }
//   }, []);

//   return (
//     <div className="p-10 text-center text-2xl text-blue-800">
//       Bem-vindo à área do Administrador!
//     </div>
//   );
// }
