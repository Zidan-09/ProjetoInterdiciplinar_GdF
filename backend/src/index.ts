import express, { Application } from "express";
import cors from "cors";
import router from "./router";

const app: Application = express();

app.use(cors());

app.use("/users", router);

app.listen(3333, () => {
    console.log('Server rodando em: http://localhost:3333/')
});

export default app;