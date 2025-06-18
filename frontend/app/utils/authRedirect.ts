'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(roleExpected: string) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role?.toLowerCase() !== roleExpected.toLowerCase()) {
      alert('Acesso não autorizado. Redirecionando para login...');
      router.push('/login');
    }
  }, []);
}
