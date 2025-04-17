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

    // consult(patient: No) {
            
    // }
}