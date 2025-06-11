import { Router } from "express";
import { AdminController, EmployersConstroller } from "../controllers/hospitalStaffControler";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";

const employeeRouter: Router = Router();

employeeRouter.post('/register', loginVerify, AccessLevelMiddleware.admin, EmployersConstroller.register);
employeeRouter.get('/activateAccount', EmployersConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployersConstroller.authAccount);
employeeRouter.put('/edit', loginVerify, AccessLevelMiddleware.admin, EmployersConstroller.edit);

employeeRouter.put('/settings/criteria', loginVerify, AccessLevelMiddleware.admin, AdminController.updateTriageCategory);

employeeRouter.get('/list/careFlow', loginVerify, AccessLevelMiddleware.admin, AdminController.listCareFlows);
employeeRouter.get('/list/:employee', loginVerify, AccessLevelMiddleware.admin, EmployersConstroller.showEmployeers);
employeeRouter.get('/list/patient', loginVerify, AccessLevelMiddleware.admin, AdminController.listPatients)
employeeRouter.get('/queueReport', loginVerify, AccessLevelMiddleware.admin, AdminController.queueReport);

employeeRouter.post('/login', EmployersConstroller.login);

export default employeeRouter;