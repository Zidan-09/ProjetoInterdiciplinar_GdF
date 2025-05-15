import { Router } from "express";
import { QueueController } from "../controllers/queueController";
import { HospitalController } from "../controllers/hospitalController";

const queueRouter: Router = Router();

queueRouter.get('/call/recep', HospitalController.callNextRecep);
queueRouter.get('/call/triage', HospitalController.callNextTriage);
queueRouter.get('/call/consult', HospitalController.callNextConsult);
queueRouter.get('/:name', QueueController.queue);

export default queueRouter;