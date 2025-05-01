import { Router } from "express";
import { NurseController } from "../controllers/hospitalStaffControler";

const nurseRouter = Router();

nurseRouter.get('/list', NurseController.list);

nurseRouter.post('/register', NurseController.register);

export default nurseRouter;