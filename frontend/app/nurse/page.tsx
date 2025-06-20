'use client';
import { useAuth } from '../utils/authRedirect';

export default function NursePage() {
  useAuth('nurse');

  return <h1>Bem-vindo ao Painel da Mãe do Trunks</h1>;
}
//Triagem:
// Botao:Iniciar triagem
//Ao apertar botao envia um GET para http:/hospital/triageInit:careflowid
//iniciou triagem
//Ai abre o formulario
//preenche o formulario
//envia(finalizar triagem)
//manda um POST para http:/hospital/triageEnd
//Visualiza a fila da triagem
//Alterar classificaçao de risco
//chama o proximo