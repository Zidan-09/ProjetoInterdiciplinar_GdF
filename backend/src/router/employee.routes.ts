import { Router } from "express";
import { ReceptionistController, NurseController, DoctorController, AdminController, Employeers } from "../controllers/hospitalStaffControler";

const employeeRouter: Router = Router();

employeeRouter.post('/admin/register', AdminController.register);
employeeRouter.patch('/admin/edit', AdminController.edit);

employeeRouter.post('/receptionist/register', ReceptionistController.register);
employeeRouter.patch('/receptionist/edit', ReceptionistController.edit);

employeeRouter.post('/nurse/register', NurseController.register);
employeeRouter.patch('/nurse/edit', NurseController.edit);

employeeRouter.post('/doctor/register', DoctorController.register);
employeeRouter.patch('/doctor/edit', DoctorController.edit);

employeeRouter.get('/triage/list', AdminController.listTriages);
employeeRouter.get('/consult/list', AdminController.listConsults);
employeeRouter.get('/list/:employee', Employeers.showEmployeers);

export default employeeRouter;