import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { loginVerify } from "../middlewares/loginMiddleware";
import { AccessLevelMiddleware } from "../middlewares/accessLevelMiddleware";
import { passwordVerify } from "../middlewares/passwordMiddleware";

const adminRouter: Router = Router();

adminRouter.get('/triageCategory/list', loginVerify, AccessLevelMiddleware.admin, AdminController.listTriageCategories);
adminRouter.post('/triageCategory/create', loginVerify, AccessLevelMiddleware.admin, AdminController.createTriageCategory);
adminRouter.patch('/triageCategory/edit', loginVerify, AccessLevelMiddleware.admin, AdminController.updateTriageCategory);
adminRouter.delete('/triageCategory/delete/byName/:triageCategory', loginVerify, AccessLevelMiddleware.admin, passwordVerify, AdminController.deleteTriageCategory);

adminRouter.get('/careFlow/list', loginVerify, AccessLevelMiddleware.admin, AdminController.listCareFlows);
adminRouter.get('/patient/list', loginVerify, AccessLevelMiddleware.admin, AdminController.listPatients);

adminRouter.get('/queue/report/:period', loginVerify, AccessLevelMiddleware.admin, AdminController.queueReport);
adminRouter.get('/careFlow/report/:period', loginVerify, AccessLevelMiddleware.admin, AdminController.careFlowTimeReport);

adminRouter.get('/patient/left/:period', loginVerify, AccessLevelMiddleware.admin, AdminController.leftBeforeConsult);

export default adminRouter;