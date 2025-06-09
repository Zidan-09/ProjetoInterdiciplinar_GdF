import Link from 'next/link';
import { ReactNode } from 'react';

export default function ReceptionLayout({children}:{children: React.ReactNode}) {
    return (
        <div className='flex h-screen'>
            <nav className='w-64 bg-blue-600 text-white flex flex-col p-4'>
                <h1 className='text-xl font-bold mb-6'>Recepção</h1>
                <Link href = '/receptionist/createTicket' className='mb-2 hover-underline'>Gerar Senha</Link>
                <Link href = '/receptionist/patientRegister' className='mb-2 hover-underline'>Cadastrar Paciente</Link>
                <Link href = '/receptionist/showQueue' className='mb-2 hover-underline'>Fila Atual</Link>
                <button
                onClick={async ()=>{
                    await fetch('/api/chamar-proximo',{method:'POST'});
                    alert('Paciente Chamado!');
                }}
                className='mt-auto bg-white text-blue-600 font-bold py-2 px-4 rounded'>
                    Chamar Proximo
                </button>
            </nav>
            <main className='flex-1 p-6'>{children}</main>
        </div>
    );
}