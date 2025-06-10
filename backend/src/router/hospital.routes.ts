import { Router } from "express";
import { HospitalController } from "../controllers/hospitalController";
import { loginVerify } from "../middlewares/loginMiddleware";

const hospitalRouter = Router();

hospitalRouter.put('/settings/criteria', loginVerify, HospitalController.changeCriteria);
hospitalRouter.post('/ticket', loginVerify, HospitalController.createTicket);
hospitalRouter.post('/patient/register', loginVerify, HospitalController.register);
hospitalRouter.get('/patient/list', loginVerify, HospitalController.list)
hospitalRouter.post('/triageInit', loginVerify, HospitalController.triageInit);
hospitalRouter.post('/triageEnd', loginVerify, HospitalController.triageEnd);
hospitalRouter.post('/consultInit', loginVerify, HospitalController.consultConfirm);
hospitalRouter.post('/consultEnd', loginVerify, HospitalController.consultEnd);

export default hospitalRouter;