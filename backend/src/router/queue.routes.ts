import { Router } from "express";
import { QueueController } from "../controllers/queueController";

const queueRouter: Router = Router();

queueRouter.get('/attend', QueueController.callAttend);
queueRouter.get('/triage', QueueController.callTriage);
queueRouter.get('/consult', QueueController.callConsult);

export default queueRouter;