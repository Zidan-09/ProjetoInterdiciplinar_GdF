import { Router } from "express";

const employeeRouter: Router = Router();

employeeRouter.get('/admin/list');
employeeRouter.post('/admin/register');
employeeRouter.put('/admin/edit');

employeeRouter.get('/recepcionist/list');
employeeRouter.post('/recepcionist/register');
employeeRouter.put('/recepcionist/edit');

employeeRouter.get('/nurse/list');
employeeRouter.post('/nurse/register');
employeeRouter.put('/nurse/edit');

employeeRouter.get('/doctor/list');
employeeRouter.post('/doctor/register');
employeeRouter.put('/doctor/edit');

export default employeeRouter;