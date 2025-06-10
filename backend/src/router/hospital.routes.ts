import { Router } from "express";
import { HospitalController } from "../controllers/hospitalController";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";

const hospitalRouter = Router();

hospitalRouter.put('/settings/criteria', loginVerify, AccessLevelMiddleware.adminAccessLevel, HospitalController.changeCriteria);
hospitalRouter.post('/ticket', loginVerify, AccessLevelMiddleware.receptionistAccessLevel, HospitalController.createTicket);
hospitalRouter.post('/patient/register', loginVerify, AccessLevelMiddleware.receptionistAccessLevel, HospitalController.register);
hospitalRouter.post('/triageInit', loginVerify, AccessLevelMiddleware.nurseAccessLevel, HospitalController.triageInit);
hospitalRouter.post('/triageEnd', loginVerify, AccessLevelMiddleware.nurseAccessLevel, HospitalController.triageEnd);
hospitalRouter.post('/consultInit', loginVerify, AccessLevelMiddleware.doctorAccessLevel, HospitalController.consultConfirm);
hospitalRouter.post('/consultEnd', loginVerify, AccessLevelMiddleware.doctorAccessLevel, HospitalController.consultEnd);

export default hospitalRouter;