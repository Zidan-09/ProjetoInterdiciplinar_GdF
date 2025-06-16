// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface ProtectedLayoutProps {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }

// export default function ProtectedLayout({ children, allowedRoles }: ProtectedLayoutProps) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const accessLevel = localStorage.getItem('accessLevel');

//     if (!token || !accessLevel || !allowedRoles.includes(accessLevel)) {
//       router.push('/login');
//     }
//   }, [router, allowedRoles]);

//   return <>{children}</>;
// }

