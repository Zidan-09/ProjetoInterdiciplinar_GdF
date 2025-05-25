import { Router } from "express";
import { AdminController, EmployeersConstroller } from "../controllers/hospitalStaffControler";

const employeeRouter: Router = Router();

employeeRouter.post('/register', EmployeersConstroller.register);
employeeRouter.get('/activateAccount', EmployeersConstroller.activateAccount);
employeeRouter.post('/authAccount', EmployeersConstroller.authAccount);
employeeRouter.put('/edit', EmployeersConstroller.edit)

employeeRouter.get('/careFlow/list', AdminController.listCareFlows);
employeeRouter.get('/list/:employee', EmployeersConstroller.showEmployeers);

employeeRouter.post('/login', EmployeersConstroller.login);

export default employeeRouter;