import { Router } from "express";
import { QueueController } from "../controllers/queueController";
import { loginVerify } from "../middlewares/loginMiddleware";

const queueRouter: Router = Router();

queueRouter.get('/call/:typeQueue', loginVerify, QueueController.callNext);
queueRouter.get('/byName/:typeQueue', loginVerify, QueueController.queue);

export default queueRouter;