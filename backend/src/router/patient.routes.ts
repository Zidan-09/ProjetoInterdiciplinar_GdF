import { Router } from "express";
import { PatientController } from "../controllers/patientController";

const patientRouter = Router();

patientRouter.post('/register', PatientController.register);

patientRouter.get('/list', PatientController.list);

export default patientRouter;