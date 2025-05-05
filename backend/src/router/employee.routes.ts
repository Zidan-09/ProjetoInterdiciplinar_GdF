import { Router } from "express";
import { AdminController, DoctorController, NurseController, RecepcionistController } from "../controllers/hospitalStaffControler";

const employeeRouter: Router = Router();

employeeRouter.get('/admin/list', AdminController.list);
employeeRouter.post('/admin/register', AdminController.register);
employeeRouter.put('/admin/edit', AdminController.edit);

employeeRouter.get('/recepcionist/list', RecepcionistController.list);
employeeRouter.post('/recepcionist/register', RecepcionistController.register);
employeeRouter.put('/recepcionist/edit', RecepcionistController.edit);

employeeRouter.get('/nurse/list', NurseController.list);
employeeRouter.post('/nurse/register', NurseController.register);
employeeRouter.put('/nurse/edit', NurseController.edit);

employeeRouter.get('/doctor/list', DoctorController.list);
employeeRouter.post('/doctor/register', DoctorController.register);
employeeRouter.put('/doctor/edit', DoctorController.edit);

export default employeeRouter;