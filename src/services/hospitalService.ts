import { Patient, Severity } from "../models/patient";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";
import { QueueFunctions } from "./queueService";

class HospitalServices {

    static triage(patient: Patient, severity: Severity, data: {systolic: number, diastolic: number, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}) {
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

        const no: NoConsult = new NoConsult(patient);
        QueueFunctions.insertConsultQueue(no);
    }

    // consult(patient: No) {
            
    // }
}