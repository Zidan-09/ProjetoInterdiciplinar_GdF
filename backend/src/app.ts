import express, { Application } from "express";
import cors from "cors";
import router from "./router";
import patientRouter from "./router/patient.routes";

const app: Application = express();

app.use(cors());

app.use("/", router);
app.use("/patient", patientRouter);

export default app;