import { Router } from "express";
import { EmployersConstroller } from "../controllers/hospitalStaffControler";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";

const employeeRouter: Router = Router();

employeeRouter.post('/register', loginVerify, AccessLevelMiddleware.admin, EmployersConstroller.register);
employeeRouter.get('/activateAccount', EmployersConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployersConstroller.authAccount);
employeeRouter.put('/edit', loginVerify, AccessLevelMiddleware.admin, EmployersConstroller.edit);

employeeRouter.get('/list/:employee', loginVerify, AccessLevelMiddleware.admin, EmployersConstroller.showEmployeers);

employeeRouter.post('/login', EmployersConstroller.login);

export default employeeRouter;