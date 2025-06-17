'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role?.toLowerCase() !== allowedRole.toLowerCase()) {
      alert('Acesso não autorizado. Redirecionando para login...');
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
}