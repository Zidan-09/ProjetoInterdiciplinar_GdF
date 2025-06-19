import { Router } from "express";
import { HospitalController } from "../controllers/hospitalController";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";

const hospitalRouter = Router();

hospitalRouter.get('/ticket/:priority', loginVerify, AccessLevelMiddleware.receptionist, HospitalController.createTicket);
hospitalRouter.post('/patient/register', loginVerify, AccessLevelMiddleware.receptionist, HospitalController.register);
hospitalRouter.post('/triageInit', loginVerify, AccessLevelMiddleware.nurse, HospitalController.triageInit);
hospitalRouter.post('/triageEnd', loginVerify, AccessLevelMiddleware.nurse, HospitalController.triageEnd);
hospitalRouter.post('/consultInit', loginVerify, AccessLevelMiddleware.doctor, HospitalController.consultInit);
hospitalRouter.post('/consultEnd', loginVerify, AccessLevelMiddleware.doctor, HospitalController.consultEnd);

export default hospitalRouter;