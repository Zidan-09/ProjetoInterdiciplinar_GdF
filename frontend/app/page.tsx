'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div
      className="relative min-h-screen w-full"
      style={{ 
        backgroundImage: "url('/AlbedoBase_XL_abstract_background_with_light_bluelight_aqua_gr_3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
       <div className="w-full max-w-5xl text-white px-10">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          SISTEMA DE GERENCIAMENTO DE<br />
          <span className="block mt-2">FILAS EM PRONTO-SOCORRO</span>
        </h1>
        <p className="text-xl mb-8 leading-relaxed">
          Em situações de emergência, ninguém deveria esperar. Nosso sistema transforma o caos<br />
          das filas de pronto-socorro em um fluxo organizado, justo e eficiente
        </p>
        <button
          onClick={handleLogin}
          className="gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-lg py-4 px-8 rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Acessar o Sistema
        </button>
      </div>
    </div>
  );
};

export default HomePage;