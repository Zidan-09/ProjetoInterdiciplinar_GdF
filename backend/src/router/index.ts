import { Router, Request, Response } from "express";
import { RecepcionistPayLoad } from "../models/hospitalStaff";

const router: Router = Router();

router.post('/recepcionists', (req: Request<{}, {}, RecepcionistPayLoad, {}>, res: Response) => {
    const { registrationNumber, name, cpf, contacts, hireDate, shift, salary, cnesCode, weeklyHours } = req.body;

    return res.json({
        mensage: 'Usuário recepcionista cadastrado com sucesso!',
        data: {
            registrationNumber,
            name,
            cpf,
            contacts,
            hireDate,
            shift,
            salary,
            cnesCode,
            weeklyHours
        }
    });
});

export default router;