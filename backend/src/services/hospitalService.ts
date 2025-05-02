import { NoConsult } from "../utils/createNoConsult";
import { QueueServices } from "./queueService";
import { Triage, Consult, Attend, Severity } from "../models/careFlow";
import { criteria } from "../models/criteria";
import { TriageData, ConsultStartData, ConsultEndData } from "../models/interfaces";
import { prisma } from "../prismaTests";

export class HospitalServices {
    static async triage(data: TriageData): Promise<Triage> {
        const triage: Triage = await prisma.triage.create(data)

        const no: NoConsult = new NoConsult(triage);
        QueueServices.insertConsultQueue(no);
        return triage;
    }

    static async changeSeverity(patient_id: number, newSeverity: Severity) {
        const search = QueueServices.search(patient_id);

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

    static async startConsult(data: ConsultStartData): Promise<[number, Date]> {
        const consult: Consult = await prisma.consult.create(data);
        return [consult.id, consult.checkInConsult];
    }

    static async endConsult(data: ConsultEndData): Promise<Consult> {
        const endDate = new Date();
        const consult: Consult = await prisma.consult.end(data.consult_id);
        consult.checkOutConsult = endDate;
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        return consult;
    }
}