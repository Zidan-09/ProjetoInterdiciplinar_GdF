import { Response, Request } from "express";
import { Recepcionist, Nurse, Doctor, Administrator, RecepcionistPayLoad } from "../models/hospitalStaff";
import { HospitalManager } from "../services/hospitalManager";

export const RecepcionistController = {
    async listAll(req: Request, res: Response) {
        const recepcionists = await Recepcionist.list();
        return res.json(recepcionists);
    },

    async register(req: Request, res: Response) {
        const newRecepcionist = await HospitalManager.registerUser(req.body);
        return res.status(201).json(newRecepcionist);
    }
}