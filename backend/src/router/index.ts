import { Router, Request, Response } from "express";

const router = Router();

router.get('/users/recepcionists', (req, res) => {
    res.send('Ola, teste')
});

router.get('/users/nurses', (req, res) => {
    res.send('Oi, teste')
});

router.get('/users/doctors', (req: Request, res: Response) => {
    res.send('Ola')
});

router.get('/users/admins', (req: Request, res: Response) => {
    res.send('Tomar no rabo, nada funciona nessa bosta')
});

export default router;