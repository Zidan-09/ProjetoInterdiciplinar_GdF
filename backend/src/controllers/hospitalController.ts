import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { CriteriaData, AdminData, TriageData } from "../models/interfaces";
import { criteria } from "../models/criteria";
import { QueueServices } from "../services/queueService";
import { HospitalServices } from "../services/hospitalService";
import { Consult } from "../models/careFlow";

export const HospitalController = {
    async createTicket(req: Request, res: Response) {
        const priority: number = req.body;
        const ticket: string = QueueServices.createTicket(priority)

        res.status(201).json({
            mensage: "Senha criada",
            ticket: ticket
        })
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
            mensage: "Triagem realizada com sucesso",
            result: result
        })
    },

    async consultConfirm(req: Request, res: Response) {
        const data = req.body;

        if (data.confirm) {
            const consult: [number, Date] = await HospitalServices.startConsult(data.doctor_id);
            res.status(200).json({
                consult: consult
            });

        } else {
            // FAZER LÓGICA DE NÃO COMPARECIMENTO
        }
    },

    async consultEnd(req: Request, res: Response) {
        const data = req.body;
        const result = await HospitalServices.endConsult(data);

        res.status(200).json({
            consult: result
        })
    }
}