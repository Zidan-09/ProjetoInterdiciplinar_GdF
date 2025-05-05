import { Router } from "express";
import { QueueController } from "../controllers/queueController";

const queueRouter: Router = Router();

queueRouter.get('/recep', QueueController.callRecep);
queueRouter.get('/triage', QueueController.callTriage);
queueRouter.get('/consult', QueueController.callConsult);
queueRouter.post('/queue', QueueController.queue);

export default queueRouter;