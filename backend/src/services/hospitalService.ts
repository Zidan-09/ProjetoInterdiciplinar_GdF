import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";
import { QueueServices } from "./queueService";
import { criteria } from "../models/criteria";
import { Triage, StartConsult, EndConsult, TriageCategory, Reception } from "../models/careFlow";
import { Patient } from "../models/patient";
import { Consult } from "../models/hospital";
import { searchBD, validateForTest } from "./returnForValidate";
import { lastCalled } from "../controllers/queueController";

export class HospitalServices {
    static async register(data: Patient) {
        const patient_id: number = await validateForTest() as number;//BD

        const triage: NodeTriage = new NodeTriage(patient_id);
        QueueServices.insertTriageQueue(triage);

        return `Paciente ${data.name} cadastrado(a) com sucesso`
    }

    static async triage(data: Triage) {
        const triage: number = await validateForTest();

        const no: NodeConsult = new NodeConsult(data);
        QueueServices.insertConsultQueue(no);
        return triage;
    };

    static async changeSeverity(patient_id: number, newSeverity: TriageCategory): Promise<string> {
        const search = QueueServices.search(patient_id);

        if (search == undefined) {
            return 'Erro'
        } else {
            search!.triage.triageCategory = newSeverity;

            switch (newSeverity) {
                case 'Non-Urgent': 
                    search.triageCategory = 1;
                    search.limitDate = {
                        limitHours: Math.round(criteria.nonUrgent / 60),
                        limitMinuts: criteria.nonUrgent % 60
                    };
                    break;
                case 'Standard':
                    search.triageCategory = 2;
                    search.limitDate = {
                        limitHours: Math.round(criteria.standard / 60),
                        limitMinuts: criteria.standard % 60
                    };
                    break;
                case 'Urgent':
                    search.triageCategory = 3;
                    search.limitDate = {
                        limitHours: Math.round(criteria.urgent / 60),
                        limitMinuts: criteria.urgent % 60
                    };
                    break;
                case 'VeryUrgent':
                    search.triageCategory = 4;
                    search.limitDate = {
                        limitHours: Math.round(criteria.veryUrgent / 60),
                        limitMinuts: criteria.veryUrgent % 60
                    };
                    break;
                case 'Immediate':
                    search.triageCategory = 5;
                    search.limitDate = {
                        limitHours: Math.round(criteria.immediate / 60),
                        limitMinuts: criteria.immediate % 60
                    };
                    search.maxPriority = true;
                    break;
            }
        }
        return 'Severidade Alterada!'
    };

    static async startConsult(data: StartConsult): Promise<number> {
        const consult: Consult = new Consult(data.doctor_id, lastCalled.patient_id);
        const consult_id: number = await validateForTest(); //BD
        return consult_id
    };

    static async endConsult(data: EndConsult) {
        const consult: Consult = await searchBD(data.id);
        consult.checkOutConsult = new Date();
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        // Atualizar no BD a consulta
        return consult;
    };
};