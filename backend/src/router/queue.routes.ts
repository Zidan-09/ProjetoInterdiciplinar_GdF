import { Router } from "express";
import { QueueController } from "../controllers/queueController";

const queueRouter: Router = Router();

queueRouter.get('/call/:typeQueue', QueueController.callNext);
queueRouter.get('/byName/:typeQueue', QueueController.queue);

export default queueRouter;