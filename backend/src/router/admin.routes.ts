import { Router } from "express";
import { AdminController } from "../controllers/hospitalStaffControler";

const adminRouter = Router();

adminRouter.get('/list', AdminController.list);

adminRouter.post('/register', AdminController.register);

export default adminRouter;