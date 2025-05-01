import { Router } from "express";
import { HospitalController } from "../controllers/hospitalController";

const hospitalRouter = Router();

hospitalRouter.put('/settings/criteria', HospitalController.changeCriteria);

export default hospitalRouter;