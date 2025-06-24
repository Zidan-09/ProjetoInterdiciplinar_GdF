'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/authRedirect';
import RegisterForm from './components/registerForm';

export default function AdminPage() {
  useAuth('admin');
  const router = useRouter();

  const irParaSocket = () => {
    router.push('/calls');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Painel do Administrador 👤</h1>

      <h2 className="text-xl font-bold mb-2">Cadastro de Novo Usuário</h2>
      <RegisterForm />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Monitor de Chamados (Socket)</h2>
        <button
          onClick={irParaSocket}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Abrir Painel de Chamados
        </button>
      </div>
    </div>
  );
}

//Botao para tela de chamados(/calls)
//ajeitar os campos
//botar um fundo
//dividir em seçoes,as funcionais(ver filas:Recepçao,triagem,consuta)
//cadastrar funcionario
//Editar funcionario
//demitir(dois campos:nome e cpf) mandava um post e muda o status no banco de active para inative
//ver os funcionarios
//Botao de recuperar(recover)