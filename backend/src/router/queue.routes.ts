import { Router } from "express";
import { QueueController } from "../controllers/queueController";

const queueRouter: Router = Router();

queueRouter.get('/call/recep', QueueController.callRecep);
queueRouter.get('/call/triage', QueueController.callTriage);
queueRouter.get('/call/consult', QueueController.callConsult);
queueRouter.get('/update', QueueController.update);
queueRouter.get('/:name', QueueController.queue);

export default queueRouter;