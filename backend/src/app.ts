import express, { Application } from "express";
import cors from "cors";
import employeeRouter from "./router/employee.routes";
import hospitalRouter from "./router/hospital.routes";
import homeRouter from "./router/home.routes";
import queueRouter from "./router/queue.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('', homeRouter)
app.use('/hospital', hospitalRouter);
app.use('/employee', employeeRouter);
app.use('/queue', queueRouter);

export default app;