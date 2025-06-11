import express, { Application } from "express";
import cors from "cors";
import employeeRouter from "./router/employee.routes";
import hospitalRouter from "./router/hospital.routes";
import queueRouter from "./router/queue.routes";
import adminRouter from "./router/admin.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/hospital', hospitalRouter);
app.use('/employee', employeeRouter);
app.use('/queue', queueRouter);
app.use('/admin', adminRouter);

export default app;