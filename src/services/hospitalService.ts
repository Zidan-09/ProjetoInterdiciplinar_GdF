import { Patient, Severity } from "../models/patient";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { TriageData } from "../utils/convertJson";

export class HospitalServices {
    static triage(patient: Patient, data: TriageData) {
        patient.vitalSigns = {
            bloodPreassure: {
                systolicPreassure: data.bloodPreassure.systolicPreassure,
                diastolicPreassure: data.bloodPreassure.diastolicPreassure,
            },
            heartRate: data.heartRate,
            respiratoryRate: data.respiratoryRate,
            bodyTemperature: data.bodyTemperature,
            oxygenSaturation: data.oxygenSaturation,
        }
        patient.severity = data.severity;
        patient.simptoms = data.simptoms;

        const no: NoConsult = new NoConsult(patient);
        QueueServices.insertConsultQueue(no);
    }

    static changeSeverity(patientCPF: Patient['cpf'], newSeverity: Severity) {
        const search = QueueServices.search(patientCPF);

        if (search == undefined || null) {
            console.log('Erro')
        } else {
            search!.patient.severity = newSeverity;

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
        if (start) {
            const startDate = new Date();
            return startDate;
        } else {
            //XXXX
        }
    }

    static endConsult() {
        const endDate = new Date();
        return endDate;
    }
}