import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { CriteriaData, AdminData, TriageData } from "../models/interfaces";
import { criteria } from "../models/criteria";
import { QueueServices } from "../services/queueService";
import { HospitalServices } from "../services/hospitalService";

export const HospitalController = {
    async createTicket(req: Request, res: Response) {
        const priority: number = req.body;
        QueueServices.createTicket(priority)
    },

    async changeCriteria(req: Request, res: Response) {
        const newCriteria: CriteriaData = req.body;

        HospitalManager.changeCriteria(newCriteria);

        res.status(201).json({
            mensage: "Critérios atualizados!",
            newCriteria: criteria
        })
    },

    async triage(req: Request, res: Response) {
        const triageData: TriageData = req.body;

        const result = await HospitalServices.triage(triageData);

        res.status(201).json({
            mensage: result
        })
    },

    async consult(req: Request, res: Response) {
    }
}