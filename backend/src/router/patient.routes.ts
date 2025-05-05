import { Router } from "express";

const patientRouter = Router();

patientRouter.get('/list');

patientRouter.post('/register');

export default patientRouter;