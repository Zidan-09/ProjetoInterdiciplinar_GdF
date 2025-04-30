import { Router } from "express";
import { AdminController } from "../controllers/hospitalController";

const adminRouter = Router();

adminRouter.put('/settings/criteria', AdminController.changeCriteria);

export default adminRouter;