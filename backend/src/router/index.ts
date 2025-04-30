import { Router, Request, Response } from "express";
import { Recepcionist, RecepcionistPayLoad } from "../models/hospitalStaff";
import { HospitalManager } from "../services/hospitalManager";

const router: Router = Router();

router.get('/users/recepcionists', (req: Request, res: Response) => {
    res.send('Recepcionistas')
});

router.get('/users/nurses', (req: Request, res: Response) => {
    res.send('Enfermeiras')
});

router.get('/users/doctors', (req: Request, res: Response) => {
    res.send('Dotôs')
});

router.get('/users/admins', (req: Request, res: Response) => {
    res.send('Adms')
});

router.get('/users/recepcionists/recepcionist', (req: Request, res: Response) => {
    res.send('Recepcionista')
});

router.get('/users/nurses/nurse', (req: Request, res: Response) => {
    res.send('Enfermeira')
});

router.get('/users/doctors/doctor', (req: Request, res: Response) => {
    res.send('Dotô')
});

router.get('/users/admins/admin', (req: Request, res: Response) => {
    res.send('admin')
});

router.post('/users/register/recepcionist', (req: Request<{}, {}, RecepcionistPayLoad>, res: Response) => {
    const data: RecepcionistPayLoad = req.body;

    if (!data.cnesCode || !data.contacts || !data.cpf || !data.hireDate || !data.name || !data.registrationNumber || !data.salary || !data.shift || !data.weeklyHours) {
        res.json('Dados incompletos, tente novamente!');
    } else {
        
    }
});

router.post('/users/register/nurse', (req: Request, res: Response) => {

});

router.post('/users/register/doctor', (req: Request, res: Response) => {

});

router.post('/users/register/admin', (req: Request, res: Response) => {

});

export default router;