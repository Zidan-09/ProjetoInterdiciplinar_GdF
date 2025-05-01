import { Router } from "express";
import { RecepcionistController } from "../controllers/hospitalStaffControler";

const recepcionistRoutes = Router();

recepcionistRoutes.get('/list', RecepcionistController.list);

recepcionistRoutes.post('/register', RecepcionistController.register);

export default recepcionistRoutes;