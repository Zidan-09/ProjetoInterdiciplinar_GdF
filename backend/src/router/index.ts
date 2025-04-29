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
    res.send('Será que alteraa?')
});

router.post('/users/recepcionists', (req: Request, res: Response) => {
    res.send('Recepcinista cadastrado com sucesso!')
});

router.post('/users/nurse', (req: Request, res: Response) => {
    res.send('Enfermeiro(a) cadastrado(a) com sucesso!')
});

router.post('/users/doctor', (req: Request, res: Response) => {
    res.send('Médico(a) cadastrado(a) com sucesso!')
});

router.post('/users/admin', (req: Request, res: Response) => {
    res.send('Administrador(a) cadastrado(a) com sucesso!')
});

router.delete('/users/recepcionists/recepcionist', (req: Request, res: Response) => {
    const recepcionist_id = req.query.id
    res.send('Recepcionista deletado do banco de dados!')
});

router.delete('/users/nurses/nurse', (req: Request, res: Response) => {
    const recepcionist_id = req.query.id
    res.send('Recepcionista deletado do banco de dados!')
});

router.delete('/users/doctors/doctor', (req: Request, res: Response) => {
    const recepcionist_id = req.query.id
    res.send('Recepcionista deletado do banco de dados!')
});

router.delete('/users/admins/admin', (req: Request, res: Response) => {
    const recepcionist_id = req.query.id
    res.send('Recepcionista deletado do banco de dados!')
});

export default router;