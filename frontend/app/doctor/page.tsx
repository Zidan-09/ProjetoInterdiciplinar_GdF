'use client';
import { useAuth } from '../utils/authRedirect';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';

export default function DoctorPage() {
  useAuth('doctor');

  const router = useRouter();

  return <h1>Bem-vindo ao Painel da Gokuzão</h1>;
}
