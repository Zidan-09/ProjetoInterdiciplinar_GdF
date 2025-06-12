import { Router } from "express";
import { EmployeesConstroller } from "../controllers/hospitalStaffController";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";

const employeeRouter: Router = Router();

employeeRouter.post('/register', loginVerify, AccessLevelMiddleware.admin, EmployeesConstroller.register);
employeeRouter.get('/activateAccount', EmployeesConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployeesConstroller.authAccount);
employeeRouter.put('/edit', loginVerify, AccessLevelMiddleware.admin, EmployeesConstroller.edit);

employeeRouter.get('/list/:employee', loginVerify, AccessLevelMiddleware.admin, EmployeesConstroller.showEmployeers);

employeeRouter.post('/login', EmployeesConstroller.login);

export default employeeRouter;