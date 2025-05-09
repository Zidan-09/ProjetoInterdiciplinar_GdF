import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { criteria, CriteriaData } from "../models/criteria";
import { lastCalled, QueueServices } from "../services/queueService";
import { HospitalServices } from "../services/hospitalService";
import { EndConsult, StartConsult, Triage } from "../models/careFlow";
import { Patient } from "../models/patient";

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
        const ticket: string = QueueServices.createTicket(data.priority)

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
        const confirmStartData: StartConsult = req.body;
        if (confirmStartData.confirm) {
            const consult_id: number = await HospitalServices.startConsult(confirmStartData);
            
            res.status(201).json({
                status: "sucess",
                message: "Consulta confirmada e iniciada",
                consult: consult_id
            })

        } else {
            const result: string = QueueServices.testCalled();
            res.status(200).json({
                message: result
            })
        }
    },

    async consultEnd(req: Request<{}, {}, EndConsult>, res: Response) {
        const endData: EndConsult = req.body;
        const result = await HospitalServices.endConsult(endData);

        res.status(200).json({
            status: "success",
            message: "Consulta finalizada",
            consult: result
        })
    }
}