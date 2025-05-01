import express, { Application } from "express";
import cors from "cors";
import patientRouter from "./router/patient.routes";
import adminRouter from "./router/admin.routes";
import doctorRouter from "./router/doctor.routes";
import recepcionistRoutes from "./router/recepcionist.routes";
import nurseRouter from "./router/nurse.routes";
import hospitalRouter from "./router/hospital.routes";
import homeRouter from "./router/home.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('', homeRouter)
app.use("/hospital", hospitalRouter);
app.use("/patient", patientRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/nurse", nurseRouter);
app.use("/recepcionist", recepcionistRoutes);

export default app;