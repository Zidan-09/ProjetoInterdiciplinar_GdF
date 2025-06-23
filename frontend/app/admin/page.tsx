'use client';
import { useAuth } from '../utils/authRedirect';
import RegisterForm from './components/registerForm';

export default function AdminPage() {
  useAuth('admin');

  return (
    <div className='p-6'>
      <h1>Bem-vindo ao Painel do Administrador</h1>
      <h2 className='text-xl font-bold mb-4'>Painel do admin</h2>
      <RegisterForm/>
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