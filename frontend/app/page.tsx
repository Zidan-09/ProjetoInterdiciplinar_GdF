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

       <div className="absolute bottom-44 left-10 text-white">

        <div className="absolute -top-60 left-0">
        <div className="flex items-center -space-x-5">
        <img 
          src="/Gemini_Generated_Image_9357q79357q79357.png" 
          alt="Logo" 
          className="h-[100px] w-[120px] mt-2 -ml-3" 
        />
        <span className="text-lg font-semibold leading-[1.1]">Sistema<br />GDF</span>
      </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold text-shadow leading-tight mb-4">
          SISTEMA DE GERENCIAMENTO<br />DE FILAS EM PRONTO-SOCORRO
        </h1>
        <p className="relative -top-4 text-xl leading-snug mb-8 text-shadow-sm">
          Em situações de emergência, ninguém deveria esperar. Nosso sistema transforma o caos<br />
          das filas de pronto-socorro em um fluxo organizado, justo e eficiente.
        </p>
        </div>
        <button
          onClick={handleLogin}
          className="relative -top-6 gap-1 bg-white/20 hover:bg-white/30 text-white font-semibold text-xl py-4 px-8 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md"
        >
          Começar &gt;
        </button>
      </div>
    </div>
  );
};

export default HomePage;