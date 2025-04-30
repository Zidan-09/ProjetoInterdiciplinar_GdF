import express, { Application } from "express";
import cors from "cors";
import patientRouter from "./router/patient.routes";
import adminRouter from "./router/admin.routes";

const app: Application = express();

app.use(cors());

app.use("/patient", patientRouter);
app.use("/admin", adminRouter);

export default app;