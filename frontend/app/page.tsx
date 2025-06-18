import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full"
      style={{ 
        backgroundImage: "url('/AlbedoBase_XL_abstract_background_with_light_bluelight_aqua_gr_3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white p-6 rounded-lg bg-gray-800 bg-opacity-60">
        <h1 className="text-5xl font-bold mb-4">
          Bem-vindo ao Meu Projeto Next.js!
        </h1>
        <p className="text-xl">
          Esta é uma tela inicial simples e elegante.
        </p>
      </div>
    </div>
  );
};

export default HomePage;