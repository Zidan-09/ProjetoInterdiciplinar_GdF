import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { criteria, CriteriaData } from "../models/criteria";
import { QueueServices } from "../services/queueService";
import { HospitalServices } from "../services/hospitalService";
import { EndConsult, StartConsult, Triage } from "../models/careFlow";
import { Patient } from "../models/patient";
import { Consult } from "../models/hospital";

type TicketRequest = { priority: number };

export const HospitalController = {
    async register(req: Request<{}, {}, Patient>, res: Response) {
        const data: Patient = req.body;

        const result = await HospitalServices.register(data);

        res.status(201).json({
            status: "success",
            message: result
        })
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            status: "sucess",
            message: "Pacientes exibidos"
        })
    },

    async createTicket(req: Request<{}, {}, TicketRequest>, res: Response) {
        const data: TicketRequest = req.body;
        const ticket: string = await QueueServices.createTicket(data.priority)

        res.status(201).json({
            status: "success",
            message: "Senha criada",
            data: ticket
        })
    },

    async changeCriteria(req: Request<{}, {}, CriteriaData>, res: Response) {
        const newCriteria: CriteriaData = req.body;

        await HospitalManager.changeCriteria(newCriteria);

        res.status(201).json({
            status: "success",
            message: "Critérios atualizados!",
            newCriteria: criteria
        })
    },

    async triage(req: Request<{}, {}, Triage>, res: Response) {
        const data: Triage = req.body;

        const result = await HospitalServices.triage(data);

        res.status(201).json({
            status: "success",
            message: "Triagem realizada com sucesso",
            result: result
        })
    },

    async consultConfirm(req: Request<{}, {}, StartConsult>, res: Response) {
        const data: StartConsult = req.body;

        if (data.confirm) {
            const consult: Consult = await HospitalServices.startConsult(data);
            res.status(200).json({
                status: "sucesso",
                message: "Consulta iniciada",
                consult: consult.id
            });

        } else {
            // FAZER LÓGICA DE NÃO COMPARECIMENTO
        }
    },

    async consultEnd(req: Request<{}, {}, EndConsult>, res: Response) {
        const data: EndConsult = req.body;
        const result = await HospitalServices.endConsult(data);

        res.status(200).json({
            status: "success",
            message: "Consulta finalizada",
            consult: result
        })
    }
}