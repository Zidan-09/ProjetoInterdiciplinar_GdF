import { Router } from "express";
import { RecepcionistController, NurseController, DoctorController, AdminController, Employeers } from "../controllers/hospitalStaffControler";

const employeeRouter: Router = Router();

employeeRouter.post('/admin/register', AdminController.register);
employeeRouter.patch('/admin/edit', AdminController.edit);

employeeRouter.post('/recepcionist/register', RecepcionistController.register);
employeeRouter.patch('/recepcionist/edit', RecepcionistController.edit);

employeeRouter.post('/nurse/register', NurseController.register);
employeeRouter.patch('/nurse/edit', NurseController.edit);

employeeRouter.post('/doctor/register', DoctorController.register);
employeeRouter.patch('/doctor/edit', DoctorController.edit);

employeeRouter.get('list/:employee', Employeers.showEmployeers);

export default employeeRouter;