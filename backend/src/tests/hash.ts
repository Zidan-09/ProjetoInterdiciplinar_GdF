import b from 'bcryptjs';

async function Hash(pass: string) {
    const hashed = await  b.hash(pass, 10);
    console.log(hashed);
}

const senha = 'Teste'; // <--- INSIRA SUA SENHA AQUI ENTRE AS ASPAS ' '

Hash(senha);