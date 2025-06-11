import { PatientManager } from "../../services/hospital/patientManager";
import { TriageService } from "../../services/hospital/triage";
import { ConsultService } from "../../services/hospital/consult";
import { EndConsult, CareFlow, StartConsult, StartTriage, EndTriage, ChangeTriageCategory } from "../../entities/careFlow";
import { CreateTicket } from "../../services/queue/services/ticketService";
import { CareFlowService } from "../../services/hospital/startCareFlow";
import { HandleResponseTest } from "./handleResponseTest";
import { CareFlowResponses, PatientResponses, QueueResponses } from "../../utils/enuns/allResponses";

type TicketRequest = { priority: number };

export const HospitalControllerTest = {
    async createTicket(request: TicketRequest) {
        try {
            const data: TicketRequest = request;
            const ticket = CreateTicket.createTicket(data.priority)

            HandleResponseTest(true, 201, CareFlowResponses.TicketCreationSucess, ticket);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, CareFlowResponses.TicketCreationFailed, null);
        }
    },

    async register(request: CareFlow) {
        try {
            const data: CareFlow = request;
            const result = await PatientManager.register(data.patient);

            if (result) {
                const careFlow: number | void = await CareFlowService.startCareFlow(result, data);

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

    async startTriage(request: StartTriage) {
        const data = request;

        try {
            const result = await TriageService.startTriage(data);
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

            if (result.status == QueueResponses.EmptyQueue || result.status == QueueResponses.NotFound) {
                HandleResponseTest(false, 400, result.status, null);
            } else {
                HandleResponseTest(true, 200, result.status, result.node);
            }
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    },

    async confirmConsult(request: StartConsult) {
        const data: StartConsult = request;

        try {
            if (data.confirm) {
                const careFlow_id: number | void = await ConsultService.startConsult(data);
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