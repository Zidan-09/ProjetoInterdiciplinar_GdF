import { Router } from "express";
import { AdminController, EmployersConstroller } from "../controllers/hospitalStaffControler";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";

const employeeRouter: Router = Router();

employeeRouter.post('/register', loginVerify, AccessLevelMiddleware.adminAccessLevel, EmployersConstroller.register);
employeeRouter.get('/activateAccount', EmployersConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployersConstroller.authAccount);
employeeRouter.put('/edit', loginVerify, AccessLevelMiddleware.adminAccessLevel, EmployersConstroller.edit)

employeeRouter.get('/list/careFlow', loginVerify, AccessLevelMiddleware.adminAccessLevel, AdminController.listCareFlows);
employeeRouter.get('/list/:employee', loginVerify, AccessLevelMiddleware.adminAccessLevel, EmployersConstroller.showEmployeers);
employeeRouter.get('/list/patient', loginVerify, AccessLevelMiddleware.adminAccessLevel, AdminController.listPatients)
employeeRouter.get('/queueReport', loginVerify, AccessLevelMiddleware.adminAccessLevel, AdminController.queueReport);

employeeRouter.post('/login', EmployersConstroller.login);

export default employeeRouter;