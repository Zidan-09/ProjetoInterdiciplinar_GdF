import { Router } from "express";
import { AdminController } from "../controllers/hospitalController";

const adminRouter = Router();

adminRouter.put('/settings/criteria', AdminController.changeCriteria);

adminRouter.get('/list', AdminController.list);

adminRouter.post('/register', AdminController.register);

export default adminRouter;