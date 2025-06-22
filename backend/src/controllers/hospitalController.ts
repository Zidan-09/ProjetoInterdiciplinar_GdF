import { Request, Response } from "express";
import { PatientManager } from "../services/hospital/patientManager";
import { TriageService } from "../services/hospital/triage";
import { ConsultService } from "../services/hospital/consult";
import { EndConsult, EndTriage, ChangeTriageCategory } from "../entities/careFlow";
import { createTicket } from "../services/queue/services/ticketService";
import { CareFlowService } from "../services/hospital/startCareFlow";
import { ErrorResponse, HandleResponse } from "../utils/systemUtils/handleResponse";
import { ServerResponses, CareFlowResponses, PatientResponses, QueueResponses } from "../utils/enuns/allResponses";
import { Patient } from "../entities/patient";

type TicketRequest = { priority: string };
type CareFlowId = { careFlow_id: string };

export const HospitalController = {
    async createTicket(req: Request<TicketRequest>, res: Response) {
        try {
            const { priority }: TicketRequest = req.params;
            const ticket: string = createTicket(parseInt(priority));

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

    async triageInit(req: Request<CareFlowId>, res: Response) {
        const { careFlow_id } = req.params;
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const result = await TriageService.startTriage(parseInt(careFlow_id), token);

            if (result) {
                HandleResponse(true, 200, CareFlowResponses.TriageStarted, result, res);
            } else {
                HandleResponse(false, 400, CareFlowResponses.ConsultFailed, null, res);
            }
            
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async triageEnd(req: Request<CareFlowId, {}, EndTriage>, res: Response) {
        const { careFlow_id } = req.params;
        const data: EndTriage = req.body;

        try {
            const result = await TriageService.endTriage(parseInt(careFlow_id), data);

            HandleResponse(true, 200, CareFlowResponses.TriageEnded, result, res);
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async changeTriageCategory(req: Request<{}, {}, ChangeTriageCategory>, res: Response) {
        const newTriageCategory: ChangeTriageCategory = req.body;

        try {
            const result = await TriageService.changeTriageCategory(newTriageCategory.patient_name, newTriageCategory.newTriageCategory);

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

    async consultInit(req: Request<CareFlowId>, res: Response) {
        const { careFlow_id } = req.params;
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const result = await ConsultService.startConsult(parseInt(careFlow_id), token);

            if (result !== undefined) {
                HandleResponse(true, 200, CareFlowResponses.ConsultStarted, careFlow_id, res);
            } else {
                HandleResponse(false, 400, CareFlowResponses.ConsultFailed, null, res);
            }
            

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async consultEnd(req: Request<CareFlowId, {}, EndConsult>, res: Response) {
        const { careFlow_id } = req.params;
        const endData: EndConsult = req.body;

        try {
            const result = await ConsultService.endConsult(parseInt(careFlow_id), endData);
    
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