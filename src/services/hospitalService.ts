import { Patient, Severity } from "../models/patient";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";

export class HospitalServices {
    static triage(patient: Patient, severity: Severity, simptoms: string[], data: {systolic: number, diastolic: number, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}) {
        patient.vitalSigns = {
            bloodPreassure: {
                systolicPreassure: data.systolic,
                diastolicPreassure: data.diastolic,
            },
            heartRate: data.heartRate,
            respiratoryRate: data.respiratoryRate,
            bodyTemperature: data.bodyTemperature,
            oxygenSaturation: data.oxygenSaturation,
        }
        patient.severity = severity;
        patient.simptoms = simptoms;

        const no: NoConsult = new NoConsult(patient);
        QueueServices.insertConsultQueue(no);
    }

    // consult(patient: No) {
            
    // }
}