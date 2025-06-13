import { Request, Response } from "express";
import { PatientManager } from "../services/hospital/patientManager";
import { TriageService } from "../services/hospital/triage";
import { ConsultService } from "../services/hospital/consult";
import { EndConsult, StartConsult, StartTriage, EndTriage, ChangeTriageCategory } from "../entities/careFlow";
import { CreateTicket } from "../services/queue/services/ticketService";
import { CareFlowService } from "../services/hospital/startCareFlow";
import { ErrorResponse, HandleResponse } from "../utils/systemUtils/handleResponse";
import { ServerResponses, CareFlowResponses, PatientResponses, QueueResponses } from "../utils/enuns/allResponses";
import { Patient } from "../entities/patient";

type TicketRequest = { priority: number };

export const HospitalController = {
    async createTicket(req: Request<{}, {}, TicketRequest>, res: Response) {
        try {
            const data: TicketRequest = req.body;
            const ticket: string = CreateTicket.createTicket(data.priority)

            HandleResponse(true, 201, CareFlowResponses.TicketCreationSucess, ticket, res);
    
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async register(req: Request<{}, {}, Patient>, res: Response) {
        try {
            const { authorization } = req.headers;
            const token = authorization!.split(' ')[1];
            const data: Patient = req.body;
            const result = await PatientManager.register(data);
    
            if (result) {
                const careFlow: number | void = await CareFlowService.startCareFlow(result, token);

                if (careFlow) {
                    HandleResponse(true, 201, PatientResponses.PatientRegistered, { careFlow, data }, res);
                }

            } else {
                HandleResponse(false, 400, PatientResponses.Error, data, res);
            }
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async triageInit(req: Request<{}, {}, StartTriage>, res: Response) {
        const data: StartTriage = req.body;
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const result = await TriageService.startTriage(data, token);

            if (result) {
                HandleResponse(true, 200, CareFlowResponses.TriageStarted, result, res);
            } else {
                HandleResponse(false, 400, CareFlowResponses.ConsultFailed, null, res);
            }
            
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async triageEnd(req: Request<{}, {}, EndTriage>, res: Response) {
        const data: EndTriage = req.body;

        try {
            const result = await TriageService.endTriage(data);

            HandleResponse(true, 200, CareFlowResponses.TriageEnded, result, res);
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async changeTriageCategory(req: Request<{}, {}, ChangeTriageCategory>, res: Response) {
        const newTriageCategory: ChangeTriageCategory = req.body;

        try {
            const result = await TriageService.changeTriageCategory(newTriageCategory.careFlow_id, newTriageCategory.newTriageCategory);

            if (result) {
                if (result.status === QueueResponses.EmptyQueue || result.status === QueueResponses.NotFound) {
                    HandleResponse(false, 400, result.status, null, res);
                } else {
                    HandleResponse(true, 200, result.status, result.node, res);
                }
            } else {
                HandleResponse(false, 400, ServerResponses.ServerError, null, res);
            }
            
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async consultInit(req: Request<{}, {}, StartConsult>, res: Response) {
        const confirmStartData: StartConsult = req.body;
        const { authorization } = req.headers;

        try {
            if (confirmStartData.confirm) {
                const token = authorization!.split(' ')[1];
                const careFlow_id: number | void = await ConsultService.startConsult(confirmStartData, token);
                
                HandleResponse(true, 200, CareFlowResponses.ConsultStarted, careFlow_id, res);

            } else {
                CareFlowService.noShow(confirmStartData.careFlow_id);
                HandleResponse(false, 200, CareFlowResponses.PatientNoShow, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async consultEnd(req: Request<{}, {}, EndConsult>, res: Response) {
        const endData: EndConsult = req.body;

        try {
            const result = await ConsultService.endConsult(endData);
    
            if (result) {
                HandleResponse(true, 201, CareFlowResponses.ConsultEnded, result, res);
            } else {
                HandleResponse(false, 400, CareFlowResponses.ConsultFailed, null, res);
            }
        } catch (error) {
            ErrorResponse(error, res);
        }
    }
}