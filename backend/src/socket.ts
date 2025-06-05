import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log(`Socket conectado: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Socket desconectado: ${socket.id}`);
        });
    });

    return io;
};

export const getSocketInstance = (): Server => io;