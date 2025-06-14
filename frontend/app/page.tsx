'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/login');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('AlbedoBase_XL_abstract_background_with_light_bluelight_aqua_gr_3.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="w-full max-w-[95vw] mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-start">
          <div className="mb-3 w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              SISTEMA DE GERENCIAMENTO<br />
              DE FILAS EM PRONTO-SOCORRO
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-100 mb-5 max-w-2xl whitespace-pre">
            Um sistema eficiente para organizar e priorizar o atendimento em pronto-socorro,{'\n'} 
            otimizando agilidade, transparência e controle das filas.
          </p>

          <button
            onClick={handleStart}
            className="bg-verdao hover:bg-verdao-light text-white font-medium text-lg py-4 px-8 rounded-3xl transition duration-200 flex items-center shadow-lg hover:shadow-xl"
          >
            COMEÇAR <span className="ml-2 text-xl">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}