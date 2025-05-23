import app from "./app";
import cron from 'node-cron';
import { initDb } from "./db";
import { PriorityHandler } from "./services/queue/managers/priorityHandler";
require('dotenv').config();

cron.schedule('* * * * *', () => {
    console.log('Atualizando Fila');
    const result: string = PriorityHandler.verify();
    console.log('Resultado:', result)
})

const PORT = process.env.PORT;

async function start() {
    await initDb();

    app.listen(PORT, () => {
        console.log(`Server rodando em: http://localhost:${PORT}`);
    });
}

start();