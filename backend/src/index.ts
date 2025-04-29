import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

app.use(cors());

app.use(router);

const PORT = 3333;
app.listen(PORT, () => {
    console.log('Server rodando');
})