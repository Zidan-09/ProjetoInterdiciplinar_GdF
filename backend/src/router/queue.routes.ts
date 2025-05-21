import { Router } from "express";
import { QueueController } from "../controllers/queueController";
import { HospitalController } from "../controllers/hospitalController";

const queueRouter: Router = Router();

queueRouter.get('/call/recep', QueueController.callNextRecep);
queueRouter.get('/call/triage', QueueController.callNextTriage);
queueRouter.get('/call/consult', QueueController.callNextConsult);
queueRouter.get('/byName/:name', QueueController.queue);

export default queueRouter;