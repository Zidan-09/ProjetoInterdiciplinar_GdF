import { Router } from "express";
import { AdminController } from "../controllers/hospitalStaffControler";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";
import { passwordVerify } from "../middlewares/passwordMiddleware";

const adminRouter: Router = Router();

adminRouter.get('/triageCategory/list', loginVerify, AccessLevelMiddleware.admin, AdminController.listTriageCategories);
adminRouter.post('/triageCategory/create', loginVerify, AccessLevelMiddleware.admin, AdminController.createTriageCategory);
adminRouter.put('/triageCategory/edit', loginVerify, AccessLevelMiddleware.admin, AdminController.updateTriageCategory);
adminRouter.delete('/triageCategory/delete/byName/:triageCategory', loginVerify, AccessLevelMiddleware.admin, passwordVerify, AdminController.deleteTriageCategory);

adminRouter.get('/careFlow/list', loginVerify, AccessLevelMiddleware.admin, AdminController.listCareFlows);
adminRouter.get('/list/patient', loginVerify, AccessLevelMiddleware.admin, AdminController.listPatients);

adminRouter.get('/queue/report', loginVerify, AccessLevelMiddleware.admin, AdminController.queueReport);
adminRouter.get('/careFlow/report', loginVerify, AccessLevelMiddleware.admin, AdminController.careFlowTimeReport);

export default adminRouter;