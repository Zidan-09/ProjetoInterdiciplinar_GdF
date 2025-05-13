import app from "./app";
import { initDb } from "./db";

const PORT = process.env.PORT || 3333;

async function start() {
    await initDb();

    app.listen(PORT, () => {
        console.log('Server rodando em: http://localhost:3333');
    });
}

start();