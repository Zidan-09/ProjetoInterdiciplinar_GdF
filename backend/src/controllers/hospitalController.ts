import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { criteria, CriteriaData } from "../models/criteria";
import { QueueServices } from "../services/queueService";
import { HospitalServices } from "../services/hospitalService";
import { EndConsult, StartConsult, Triage } from "../models/careFlow";
import { Patient } from "../models/patient";

export const HospitalController = {
    async register(req: Request<{}, {}, Patient>, res: Response) {
        const data: Patient = req.body;

        const result = await HospitalServices.register(data);

        res.status(201).json({
            mensage: result
        })
    },

    async createTicket(req: Request<number>, res: Response) {
        const data: number = req.body;
        const ticket: string = await QueueServices.createTicket(data)

        res.status(201).json({
            mensage: "Senha criada",
            ticket: ticket
        })
    },

    async changeCriteria(req: Request<{}, {}, CriteriaData>, res: Response) {
        const newCriteria: CriteriaData = req.body;

        HospitalManager.changeCriteria(newCriteria);

        res.status(201).json({
            mensage: "Critérios atualizados!",
            newCriteria: criteria
        })
    },

    async triage(req: Request<{}, {}, Triage>, res: Response) {
        const data: Triage = req.body;

        const result = await HospitalServices.triage(data);

        res.status(201).json({
            mensage: "Triagem realizada com sucesso",
            result: result
        })
    },

    async consultConfirm(req: Request<{}, {}, StartConsult>, res: Response) {
        const data: StartConsult = req.body;

        if (data.confirm) {
            const consult: [number, Date] | void = await HospitalServices.startConsult(data); // TIRAR O VOID
            res.status(200).json({
                consult: consult
            });

        } else {
            // FAZER LÓGICA DE NÃO COMPARECIMENTO
        }
    },

    async consultEnd(req: Request<{}, {}, EndConsult>, res: Response) {
        const data: EndConsult = req.body;
        const result = await HospitalServices.endConsult(data);

        res.status(200).json({
            consult: result
        })
    }
}