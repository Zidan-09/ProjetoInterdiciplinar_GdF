'use client';

export default function AdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Área Administrativa</h1>
      <p>Bem-vindo, admin!</p>
    </div>
  );
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
