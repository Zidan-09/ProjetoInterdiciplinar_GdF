import { Response, Request } from "express";
import { Convert } from "../utils/convertJson";

let id: number = 1;

export const RegisterRecepcionist = (req: Request, res: Response) => {
    const { RecepcionistData } = req.body;

    if (!RecepcionistData) {
        return res.status(400).json({error: 'dados obrigatórios!'});
    }
}