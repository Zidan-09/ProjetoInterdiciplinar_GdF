import { Router } from "express";
import { PatientController } from "../controllers/patientController";

const patientRouter = Router();

patientRouter.get('/list', PatientController.list);

patientRouter.post('/register', PatientController.register);

export default patientRouter;