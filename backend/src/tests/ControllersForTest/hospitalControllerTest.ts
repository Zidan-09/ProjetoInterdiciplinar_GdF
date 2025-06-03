import { CriteriaData } from "../../entities/criteria";
import { CriteriaManager } from "../../services/staff/criteriaUpdate";
import { PatientManager } from "../../services/hospital/patientManager";
import { TriageService } from "../../services/hospital/triage";
import { ConsultService } from "../../services/hospital/consult";
import { EndConsult, CareFlow, StartConsult, Triage, ChangeTriageCategory } from "../../entities/careFlow";
import { CreateTicket } from "../../services/queue/services/ticketService";
import { calledsList, Result } from "../../services/queue/services/called";
import { CareFlowService } from "../../services/hospital/startCareFlow";
import { QueueReturns } from "../../utils/queueUtils/queueEnuns";
import { CareFlowResponses } from "../../utils/systemUtils/CareFlowResponses";
import { HandleResponseTest } from "./handleResponseTest";
import { PatientResponses } from "../../utils/personsUtils/generalEnuns";

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

    async list() {
        try {
            const patients = await PatientManager.list();

            if (patients != 'Erro ao listar pacientes cadastrados') {
                HandleResponseTest(true, 200, PatientResponses.PatientListed, patients);
            } else {
                HandleResponseTest(false, 400, PatientResponses.Error, null);
            }
        } catch (error) {
            console.error(error);
        }
    },

    async changeCriteria(request: CriteriaData) {
        const newCriteria: CriteriaData = request;

        try {
            await CriteriaManager.changeCriteria(newCriteria);
            HandleResponseTest(true, 200, CareFlowResponses.CriteriaUpdateSucess, newCriteria);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, CareFlowResponses.CriteriaUptadeFailed, null);
        }
    },

    async triage(request: Triage) {
        const data = request;

        try {
            const result = await TriageService.triage(data);
            const resultParsed = JSON.stringify(result)
            HandleResponseTest(true, 200, CareFlowResponses.TriageSucess, resultParsed);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 400, CareFlowResponses.TriageFailed, null);
        }
    },

    async changeTriageCategory(request: ChangeTriageCategory) {
        const data: ChangeTriageCategory = request;

        try {
            const result = await TriageService.changeSeverity(data.careFlow_id, data.newTriageCategory);

            if (result.status == QueueReturns.EmptyQueue || result.status == QueueReturns.NotFound) {
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
                const result = await calledsList.searchCalled(data.careFlow_id);

                if (result.status === QueueReturns.EmptyQueue || result.status === QueueReturns.NotFound) {
                    HandleResponseTest(false, 400, result.status, null);
                } else {
                    if (result.message === Result.PatientCalled) {
                        HandleResponseTest(true, 200, result.status, result.message);
                    } else {
                        HandleResponseTest(false, 400, result.status, result.message);
                    }
                }
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