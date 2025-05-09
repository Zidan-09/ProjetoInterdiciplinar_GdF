import { Router } from "express";
import { QueueController } from "../controllers/queueController";

const queueRouter: Router = Router();

queueRouter.get('/recep', QueueController.callRecep);
queueRouter.get('/triage', QueueController.callTriage);
queueRouter.get('/consult', QueueController.callConsult);
queueRouter.get('/update', QueueController.update);
queueRouter.post('/', QueueController.queue);

export default queueRouter;