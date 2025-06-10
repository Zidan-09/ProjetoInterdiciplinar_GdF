import { Router } from "express";
import { AdminController, EmployersConstroller } from "../controllers/hospitalStaffControler";
import { loginVerify } from "../middlewares/loginMiddleware";

const employeeRouter: Router = Router();

employeeRouter.post('/register', loginVerify, EmployersConstroller.register);
employeeRouter.get('/activateAccount', EmployersConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployersConstroller.authAccount);
employeeRouter.put('/edit', loginVerify, EmployersConstroller.edit)

employeeRouter.get('/list/careFlow', loginVerify, AdminController.listCareFlows);
employeeRouter.get('/list/:employee', loginVerify, EmployersConstroller.showEmployeers);
employeeRouter.get('/queueReport', loginVerify, AdminController.queueReport);

employeeRouter.post('/login', EmployersConstroller.login);

export default employeeRouter;