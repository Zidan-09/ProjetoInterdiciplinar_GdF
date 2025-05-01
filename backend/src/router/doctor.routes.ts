import { Router } from "express";
import { DoctorController } from "../controllers/hospitalStaffControler";

const doctorRouter = Router();

doctorRouter.get('/list', DoctorController.list);

doctorRouter.post('/register', DoctorController.register);

export default doctorRouter;