import app from "./app";
import { createServer } from "http";
import { StartSchedule } from "./utils/queueUtils/updateQueue";
import { initSocket } from "./socket";
require('dotenv').config();

const PORT = process.env.PORT || 3333;

async function start() {
    const httpServer = createServer(app);
    
    initSocket(httpServer);

    StartSchedule();

    httpServer.listen(PORT, () => {
        console.log(`Server rodando em: http://localhost:${PORT}`);
    });
}

start();