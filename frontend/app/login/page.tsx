'use client'

import { METHODS } from "http";
import { headers } from "next/headers";
import {FormEvent, useState} from "react"

export default function LoginPage(){
    const[email,setEmail] = useState('');
    const[senha,setSenha] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login',{
            method:'POST',
            body:JSON.stringify({email,senha}),
            headers:{'Content-Type':'application/json'},
        });

        if (res.ok) {
            const {token} = await res.json();
            localStorage.setItem('token',token);
            window.location.href = '/reception/createToken';
        } else {
            alert('Credenciais Inválidas');
        }
    };

    return(
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Login da Recepção</h1>
            <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="text-black w-full mb-4 p-2 border rounded"
            required
            />
            <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="text-black w-full mb-4 p-2 border rounded"
            required
            />
            
            <button className="bg-blue-600 text-white w-full p-2 rounded">Entrar</button>
        </form>
    );
    }
