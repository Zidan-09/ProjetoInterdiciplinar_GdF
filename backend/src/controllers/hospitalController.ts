import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { CriteriaData } from "../models/interfaces";
import { criteria } from "../models/criteria";

export const AdminController = {
    async changeCriteria(req: Request, res: Response) {
        const newCriteria: CriteriaData = req.body;

        HospitalManager.changeCriteria(newCriteria);

        res.status(201).json({
            mensage: "Critérios atualizados!",
            newCriteria: criteria
        })
    }
}
