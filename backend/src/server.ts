import app from "./app";
import { initDb } from "./db";
import { StartSchedule } from "./utils/queueUtils/updateQueue";
require('dotenv').config();

const PORT = process.env.PORT;

async function start() {
    await initDb();

    StartSchedule();

    app.listen(PORT, () => {
        console.log(`Server rodando em: http://localhost:${process.env.PORT}`);
    });
}

start();