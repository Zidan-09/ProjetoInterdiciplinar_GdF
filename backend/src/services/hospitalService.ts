import { NoConsult } from "../utils/createNoConsult";
import { QueueServices } from "./queueService";
import { Nurse } from "../models/hospitalStaff";
import { Triage, Consult, Attend, Severity } from "../models/careFlow";
import { criteria } from "../models/criteria";
import { TriageData, ConsultData } from "../models/interfaces";

export class HospitalServices {
    static triage(data: TriageData): string {
        const triage: Triage = new Triage(
            data.patient, data.nurse_id, data.vitalSigns, data.severity, data.simptoms, data.painLevel
        );

        const no: NoConsult = new NoConsult(triage);
        QueueServices.insertConsultQueue(no);
        return 'Triagem realizada com sucesso!'
    }

    static changeSeverity(id: number, newSeverity: Severity) {
        const search = QueueServices.search(id);

        if (search == undefined || null) {
            console.log('Erro')
        } else {
            search!.triage.severity = newSeverity;

            switch (newSeverity) {
                case 'Non-urgent': 
                    search.severity = 1;
                    search.limit = criteria.nonUrgent;
                    break;
                case 'Low-urgency':
                    search.severity = 2;
                    search.limit = criteria.lowUrgency;
                    break;
                case 'Urgent':
                    search.severity = 3;
                    search.limit = criteria.urgent;
                    break;
                case 'Very-urgent':
                    search.severity = 4;
                    search.limit = criteria.veryUrgent;
                    break;
                case 'Immediate':
                    search.severity = 5;
                    search.limit = criteria.immediate;
                    break;
            }
        }
    }

    static startConsult(start: Boolean): string {
        return 'oi';
    }

    static endConsult(consult: Consult, diagnosis: string, prescriptions: string[], notes: string) {
        const endDate = new Date();
        consult.checkOutConsult = endDate;
        consult.diagnosis = diagnosis;
        consult.prescriptions = prescriptions;
        consult.notes = notes;
        return consult;
    }
}