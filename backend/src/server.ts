import app from "./app";
import { createServer } from "http";
import { initDb } from "./db";
import { StartSchedule } from "./utils/queueUtils/updateQueue";
import { initSocket } from "./socket";
require('dotenv').config();

const PORT = process.env.PORT;

async function start() {
    const httpServer = createServer(app);
    
    initSocket(httpServer);

    await initDb();
    StartSchedule();

    httpServer.listen(PORT, () => {
        console.log(`Server rodando em: http://localhost:${PORT}`);
    });
}

start();