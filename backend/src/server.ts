import app from "./app";
import cron from 'node-cron';
import { initDb } from "./db";
import { PriorityHandler } from "./services/queue/managers/priorityHandler";

cron.schedule('* * * * *', () => {
    console.log('Atualizando Fila');
    const result: string = PriorityHandler.verify();
    console.log('Resultado:', result)
})

const PORT = process.env.PORT || 3333;

async function start() {
    await initDb();

    app.listen(PORT, () => {
        console.log('Server rodando em: http://localhost:3333');
    });
}

start();