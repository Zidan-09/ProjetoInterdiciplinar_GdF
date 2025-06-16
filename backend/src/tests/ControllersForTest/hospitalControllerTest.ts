import { PatientManager } from "../../services/hospital/patientManager";
import { TriageService } from "../../services/hospital/triage";
import { ConsultService } from "../../services/hospital/consult";
import { EndConsult, StartConsult, StartTriage, EndTriage, ChangeTriageCategory } from "../../entities/careFlow";
import { createTicket } from "../../services/queue/services/ticketService";
import { CareFlowService } from "../../services/hospital/startCareFlow";
import { HandleResponseTest } from "./handleResponseTest";
import { CareFlowResponses, PatientResponses, QueueResponses, ServerResponses } from "../../utils/enuns/allResponses";
import { Patient } from "../../entities/patient";

type TicketRequest = { priority: number };

export const HospitalControllerTest = {
    async createTicket(request: TicketRequest) {
        try {
            const data: TicketRequest = request;
            const ticket = createTicket(data.priority)

            HandleResponseTest(true, 201, CareFlowResponses.TicketCreationSucess, ticket);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, CareFlowResponses.TicketCreationFailed, null);
        }
    },

    async register(request: Patient, header: string) {
        try {
            const data: Patient = request;
            const token = header!.split(' ')[1];
            
            const result = await PatientManager.register(data);

            if (result) {
                const careFlow: number | void = await CareFlowService.startCareFlow(result, token);

                if (careFlow) {
                    const dataParsed = JSON.stringify(data);
                    HandleResponseTest(true, 201, PatientResponses.PatientRegistered, { careFlow, dataParsed })
                }
            } else {
                HandleResponseTest(false, 400, PatientResponses.Error, null);
            }

        } catch (error) {
            console.error(error);
        }
    },

    async startTriage(request: StartTriage, header: string) {
        const data = request;
        const token = header!.split(' ')[1];

        try {
            const result = await TriageService.startTriage(data, token);
            const resultParsed = JSON.stringify(result)
            HandleResponseTest(true, 200, CareFlowResponses.TriageStarted, resultParsed);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 400, CareFlowResponses.TriageFailed, null);
        }
    },

    async endTriage(request: EndTriage) {
        const data = request;

        try {
            const result = await TriageService.endTriage(data);
            const resultParsed = JSON.stringify(result);
            HandleResponseTest(true, 200, CareFlowResponses.TriageEnded, resultParsed);
            
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, CareFlowResponses.TriageFailed, null)
        }
    },

    async changeTriageCategory(request: ChangeTriageCategory) {
        const data: ChangeTriageCategory = request;

        try {
            const result = await TriageService.changeTriageCategory(data.careFlow_id, data.newTriageCategory);

            if (result) {
                if (result.status == QueueResponses.EmptyQueue || result.status == QueueResponses.NotFound) {
                    HandleResponseTest(false, 400, result.status, null);
                } else {
                    HandleResponseTest(true, 200, result.status, result.node);
                }
            } else {
                HandleResponseTest(false, 400, ServerResponses.ServerError, null);
            }
            
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    },

    async confirmConsult(request: StartConsult, header: string) {
        const data: StartConsult = request;
        const token = header!.split(' ')[1];

        try {
            if (data.confirm) {
                const careFlow_id: number | void = await ConsultService.startConsult(data, token);
                HandleResponseTest(true, 200, CareFlowResponses.ConsultStarted, careFlow_id);

            } else {
                
            }
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    },

    async consultEnd(request: EndConsult) {
        const data: EndConsult = request;

        try {
            const result = await ConsultService.endConsult(data);

            if (result) {
                HandleResponseTest(true, 200, CareFlowResponses.ConsultEnded, result);
            } else {
                HandleResponseTest(false, 400, CareFlowResponses.ConsultFailed, null);
            }
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    }
}