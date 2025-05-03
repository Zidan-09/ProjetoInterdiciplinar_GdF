import { NoConsult } from "../utils/createNoConsult";
import { QueueServices } from "./queueService";
import { Triage, Consult, Attend, Severity } from "../models/careFlow";
import { criteria } from "../models/criteria";
import { TriageData, ConsultStartData, ConsultEndData } from "../models/interfaces";
import { consults, prisma, triages } from "../prismaTests";

export class HospitalServices {
    static async triage(data: TriageData): Promise<Triage> {
        const triage: Triage = await prisma.triage.create(data)

        const no: NoConsult = new NoConsult(triage);
        QueueServices.insertConsultQueue(no);
        triages.push(triage);
        return triage;
    }

    static async changeSeverity(patient_id: number, newSeverity: Severity): Promise<string> {
        const search = QueueServices.search(patient_id);

        if (search == undefined || null) {
            return 'Erro'
        } else {
            search!.triage.severity = newSeverity;

            switch (newSeverity) {
                case 'NonUrgent': 
                    search.severity = 1;
                    search.limit = criteria.nonUrgent;
                    break;
                case 'LowUrgency':
                    search.severity = 2;
                    search.limit = criteria.lowUrgency;
                    break;
                case 'Urgent':
                    search.severity = 3;
                    search.limit = criteria.urgent;
                    break;
                case 'VeryUrgent':
                    search.severity = 4;
                    search.limit = criteria.veryUrgent;
                    break;
                case 'Immediate':
                    search.severity = 5;
                    search.limit = criteria.immediate;
                    break;
            }
        }
        return 'Severidade Alterada!'
    }

    static async startConsult(data: ConsultStartData): Promise<[number, Date]> {
        const consult: Consult = await prisma.consult.create(data);
        consults.push(consult);
        console.log('TESTE 1, CONSULTAS:', consults);
        return [consult.id!, consult.checkInConsult];
    }

    static async endConsult(data: ConsultEndData): Promise<Consult> {
        const consult: Consult = await prisma.consult.end(data.consult_id);
        consult.checkOutConsult = new Date();
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        return consult;
    }
}