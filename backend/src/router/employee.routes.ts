import { Router } from "express";
import { AdminController, EmployersConstroller } from "../controllers/hospitalStaffControler";

const employeeRouter: Router = Router();

employeeRouter.post('/register', EmployersConstroller.register);
employeeRouter.get('/activateAccount', EmployersConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployersConstroller.authAccount);
employeeRouter.put('/edit', EmployersConstroller.edit)

employeeRouter.get('/list/careFlow', AdminController.listCareFlows);
employeeRouter.get('/list/:employee', EmployersConstroller.showEmployeers);

employeeRouter.post('/login', EmployersConstroller.login);

export default employeeRouter;