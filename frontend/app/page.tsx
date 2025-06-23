'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
     <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed blur-[2px]"
          style={{ 
          backgroundImage: "url('/AlbedoBase_XL_abstract_background_with_light_bluelight_aqua_gr_3.jpg')"
        }}
      />

       <div className="absolute bottom-44 left-10 text-white text-shadow">
        <h1 className="text-6xl font-bold mb-3">
          SISTEMA DE GERENCIAMENTO<br />DE FILAS EM PRONTO-SOCORRO
        </h1>
        <p className="text-xl mb-8">
          Em situações de emergência, ninguém deveria esperar. Nosso sistema transforma o caos<br />
          das filas de pronto-socorro em um fluxo organizado, justo e eficiente
        </p>
        <button
          onClick={handleLogin}
          className="gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-xl py-4 px-8 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Começar
        </button>
      </div>
    </div>
  );
};

export default HomePage;