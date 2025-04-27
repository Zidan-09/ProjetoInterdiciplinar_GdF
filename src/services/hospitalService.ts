import { Patient, Severity } from "../models/patient";
import { NoConsult } from "../utils/createNoConsult";
import { QueueServices } from "./queueService";
import { TriageData } from "../utils/convertJson";
import { Triage } from "../careFlow/triage";
import { Doctor, Nurse } from "../models/hospitalStaff";
import { Attend } from "../careFlow/attend";
import { Consult } from "../careFlow/consult";
import { doctor } from "../tests/test";

export class HospitalServices {
    static triage(nurse: Nurse, attend: Attend, data: TriageData) {
        const triage = new Triage(nurse, attend, data.vitalSigns, data.severity, data.simptoms, data.painLevel);

        const no: NoConsult = new NoConsult(triage);
        QueueServices.insertConsultQueue(no);
        console.log('Triagem realizada com sucesso!')
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
                    search.limit = 240;
                    break;
                case 'Low-urgency':
                    search.severity = 2;
                    search.limit = 120;
                    break;
                case 'Urgent':
                    search.severity = 3;
                    search.limit = 60;
                    break;
                case 'Very-urgent':
                    search.severity = 4;
                    search.limit = 10;
                    break;
                case 'Immediate':
                    search.severity = 5;
                    search.limit = 0;
                    break;
            }
        }
    }

    static startConsult(start: Boolean) {
        const triage: Triage = QueueServices.callNextConsult();
        if (start) {
            const consult: Consult = new Consult(triage!, doctor);
            const startDate = new Date();
            consult.checkInConsult = startDate;
        } else {
        }
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