import { Response, Request } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { prisma } from "../prismaTests"
import { RecepcionistData } from "../models/interfaces";
import { ValidateRegister } from "../utils/validateRegister";

export const RecepcionistController = {
    async register(req: Request, res: Response) {
        const data: RecepcionistData = req.body;
        let validate: Boolean = ValidateRegister.verifyUser(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerUser(data);
            if (done) {
                res.status(201).json({
                    mensage: "Recepcionista cadastrado com sucesso!"
                });
            } else {
                res.status(400).json({
                    mensage: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                mensage: "Recepcionista já cadastrado",
            })
        }
    }
}