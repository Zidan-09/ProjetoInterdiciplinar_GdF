import { Request, Response } from "express";
import { CriteriaData } from "../entities/criteria";
import { CriteriaManager } from "../services/adm/criteriaUpdate";
import { PatientManager } from "../services/hospital/patientManager";
import { TriageService } from "../services/hospital/triage";
import { ConsultService } from "../services/hospital/consult";
import { EndConsult, CareFlow, StartConsult, StartTriage, EndTriage, ChangeTriageCategory } from "../entities/careFlow";
import { CreateTicket } from "../services/queue/services/ticketService";
import { calledsList, Result } from "../services/queue/services/called";
import { CareFlowService } from "../services/hospital/startCareFlow";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { QueueReturns } from "../utils/queueUtils/queueEnuns";
import { CareFlowResponses } from "../utils/systemUtils/CareFlowResponses";
import { PatientResponses } from "../utils/personsUtils/generalEnuns";

type TicketRequest = { priority: number };

export const HospitalController = {
    async createTicket(req: Request<{}, {}, TicketRequest>, res: Response) {
        try {
            const data: TicketRequest = req.body;
            const ticket: string = CreateTicket.createTicket(data.priority)

            HandleResponse(true, 201, CareFlowResponses.TicketCreationSucess, ticket, res)
    
        } catch (error) {
            console.error(error);
            HandleResponse(false, 400, CareFlowResponses.TicketCreationFailed, error as string, res)
        }
    },

    async register(req: Request<{}, {}, CareFlow>, res: Response) {
        try {
            const data: CareFlow = req.body;
            const result = await PatientManager.register(data.patient);
    
            if (result) {
                const careFlow: number | void = await CareFlowService.startCareFlow(result, data);

                if (careFlow) {
                    HandleResponse(true, 201, PatientResponses.PatientRegistered, { careFlow, data }, res);
                }

            } else {
                HandleResponse(false, 400, PatientResponses.Error, data, res);
            }
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res)
        }
    },

    async changeCriteria(req: Request<{}, {}, CriteriaData>, res: Response) {
        const newCriteria: CriteriaData = req.body;

        try {
            await CriteriaManager.changeCriteria(newCriteria);
            HandleResponse(true, 200, CareFlowResponses.CriteriaUpdateSucess, newCriteria, res);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, CareFlowResponses.CriteriaUptadeFailed, newCriteria, res);
        }
    },

    async triageInit(req: Request<{}, {}, StartTriage>, res: Response) {
        const data: StartTriage = req.body;
        try {
            const result = await TriageService.startTriage(data);

            HandleResponse(true, 200, CareFlowResponses.TriageStarted, result, res);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 400, CareFlowResponses.TriageFailed, null, res);
        }
    },

    async triageEnd(req: Request<{}, {}, EndTriage>, res: Response) {
        const data: EndTriage = req.body;

        try {
            const result = await TriageService.endTriage(data);

            HandleResponse(true, 200, CareFlowResponses.TriageEnded, result, res);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },

    async changeTriageCategory(req: Request<{}, {}, ChangeTriageCategory>, res: Response) {
        const newTriageCategory: ChangeTriageCategory = req.body;

        try {
            const result = await TriageService.changeSeverity(newTriageCategory.careFlow_id, newTriageCategory.newTriageCategory);

            if (result.status === QueueReturns.EmptyQueue || result.status === QueueReturns.NotFound) {
                HandleResponse(false, 400, result.status, null, res);
            } else {
                HandleResponse(true, 200, result.status, result.node, res);
            }
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },

    async consultConfirm(req: Request<{}, {}, StartConsult>, res: Response) {
        const confirmStartData: StartConsult = req.body;

        try {
            if (confirmStartData.confirm) {
                const careFlow_id: number | void = await ConsultService.startConsult(confirmStartData);
                
                HandleResponse(true, 200, CareFlowResponses.ConsultStarted, careFlow_id, res);

            } else {
                const result = await calledsList.searchCalled(confirmStartData.careFlow_id);

                if (result.status === QueueReturns.EmptyQueue || result.status === QueueReturns.NotFound) {
                    HandleResponse(false, 400, result.status, null, res);
                } else {
                    if (result.message === Result.PatientCalled) {
                        HandleResponse(true, 200, result.status, result.message, res);
                    } else {
                        HandleResponse(false, 400, result.status, result.message, res);
                    }
                }
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
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
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    }
}