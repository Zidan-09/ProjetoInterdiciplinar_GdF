import { Router, Request, Response } from "express";
import { RecepcionistPayLoad } from "../models/hospitalStaff";

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

export default router;