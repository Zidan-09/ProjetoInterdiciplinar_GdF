import { Router } from "express";
import { HospitalController } from "../controllers/hospitalController";

const hospitalRouter = Router();

hospitalRouter.put('/settings/criteria', HospitalController.changeCriteria);
hospitalRouter.post('/ticket', HospitalController.createTicket);
hospitalRouter.post('/patient/register', HospitalController.register);
hospitalRouter.get('/patient/list', HospitalController.list)
hospitalRouter.post('/triage', HospitalController.triage);
hospitalRouter.post('/consultInit', HospitalController.consultConfirm);
hospitalRouter.post('/consultEnd', HospitalController.consultEnd);

export default hospitalRouter;