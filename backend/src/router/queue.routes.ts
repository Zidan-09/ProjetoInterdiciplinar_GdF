import { Router } from "express";
import { QueueController } from "../controllers/queueController";

const queueRouter: Router = Router();

queueRouter.get('/call/:queue', QueueController.callNext);
queueRouter.get('/byName/:queue', QueueController.queue);

export default queueRouter;