'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const accessLevel = localStorage.getItem('accessLevel');

    if (!token || accessLevel !== 'Admin') {
      router.push('/login');
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Área do Admin</h1>
    </div>
  );
}
