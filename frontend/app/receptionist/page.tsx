'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReceptionistPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const accessLevel = localStorage.getItem('accessLevel');

    if (!token || accessLevel !== 'receptionist') {
      router.push('/login');
    }
  }, []);

  const handleClick = () => {
    console.log('Botão clicado');
  };

  return (
    <div className="p-10 text-center text-2xl text-green-700">
      Bem-vindo à área da Recepção!
      <button onClick={handleClick} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Testar Botão
      </button>
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
