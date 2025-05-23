import { Request, Response } from "express";
import { criteria, CriteriaData } from "../models/criteria";
import { CriteriaManager } from "../services/staff/criteriaUpdate";
import { PatientManager } from "../services/hospital/patientManager";
import { TriageService } from "../services/hospital/triage";
import { ConsultService } from "../services/hospital/consult";
import { EndConsult, CareFlow, StartConsult, Triage, TriageCategory } from "../models/careFlow";
import { CreateTicket } from "../services/queue/services/ticketService";
import { calledsList } from "../services/queue/services/called";
import { CareFlowService } from "../services/hospital/startCareFlow";

type TicketRequest = { priority: number };

export const HospitalController = {
    async createTicket(req: Request<{}, {}, TicketRequest>, res: Response) {
        const data: TicketRequest = req.body;
        const ticket: string = CreateTicket.createTicket(data.priority)

        res.status(201).json({
            status: "success",
            message: "Senha criada",
            data: ticket
        })
    },

    async register(req: Request<{}, {}, CareFlow>, res: Response) {
        const data: CareFlow = req.body;

        const result = await PatientManager.register(data.patient);

        if (result[2] === 'Erro ao cadastrar o paciente') {
            res.status(400).json({
                status: "error",
                message: result
            })
        } else {
            const careFlowid: number = await CareFlowService.startCareFlow(result[1], data);

            res.status(201).json({
                status: "success",
                message: result,
                careFlowId: careFlowid
            })
        }
    },

    async list(req: Request, res: Response) {
        const patients = await PatientManager.list();

        res.status(200).json({
            status: "sucess",
            patients: patients,
            message: "Pacientes cadastrados exibidos"
        })
    },

    async changeCriteria(req: Request<{}, {}, CriteriaData>, res: Response) {
        const newCriteria: CriteriaData = req.body;

        await CriteriaManager.changeCriteria(newCriteria);

        res.status(201).json({
            status: "success",
            message: "Critérios atualizados!",
            newCriteria: criteria
        })
    },

    async triage(req: Request<{}, {}, Triage>, res: Response) {
        const data: Triage = req.body;

        const result = await TriageService.triage(data);

        res.status(201).json({
            status: "success",
            message: "Triagem realizada com sucesso",
            result: result
        })
    },

    async changeTriageCategory(req: Request<{}, {}, TriageCategory>, res: Response) {
        const newTriageCategory: TriageCategory = req.body;

        const result = await TriageService.changeSeverity(1, newTriageCategory)

        if (result[0]) {
            res.status(200).json({
                status: "success",
                message: result[1]
            })
        } else {
            res.json({
                status: "error",
                message: result[1]
            })
        }
    },

    async consultConfirm(req: Request<{}, {}, StartConsult>, res: Response) {
        const confirmStartData: StartConsult = req.body;
        if (confirmStartData.confirm) {
            const consult_id: number = await ConsultService.startConsult(confirmStartData);
            
            res.status(201).json({
                status: "sucess",
                message: "Consulta confirmada e iniciada",
                consult: consult_id
            })

        } else {
            const result = calledsList.searchCalled(confirmStartData.careFlow_id);

            if (result == 'Paciente não encontrado') {
                res.status(400).json({
                    status: "error",
                    message: result
                });
            } else {

            }
        }
    },

    async consultEnd(req: Request<{}, {}, EndConsult>, res: Response) {
        const endData: EndConsult = req.body;
        const result = await ConsultService.endConsult(endData);

        res.status(200).json({
            status: "success",
            message: "Consulta finalizada",
            consult: result
        })
    }
}