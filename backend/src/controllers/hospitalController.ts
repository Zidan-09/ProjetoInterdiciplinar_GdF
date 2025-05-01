import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { CriteriaData, AdminData } from "../models/interfaces";
import { criteria } from "../models/criteria";
import { prisma } from "../prismaTests";
import { ValidateRegister } from "../utils/validateRegister";

export const HospitalController = {
    async changeCriteria(req: Request, res: Response) {
        const newCriteria: CriteriaData = req.body;

        HospitalManager.changeCriteria(newCriteria);

        res.status(201).json({
            mensage: "Critérios atualizados!",
            newCriteria: criteria
        })
    }
}