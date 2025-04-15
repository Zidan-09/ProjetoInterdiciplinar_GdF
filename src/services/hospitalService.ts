import { Patient, VitalSigns, BloodPreassure, Severity } from "../models/patient";
import { No } from "../utils/createNo";
import { QueueFunctions } from "./queueService";

class HospitalServices {

    triage(patient: Patient, severity: Severity, data: {systolic: number, diastolic: number, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}) {
        let bloodPreassure: BloodPreassure = new BloodPreassure(data.systolic, data.diastolic)
        let vitalSigns: VitalSigns = new VitalSigns(bloodPreassure, data.heartRate, data.respiratoryRate, data.bodyTemperature, data.oxygenSaturation)

        patient.vitalSigns = vitalSigns;
        patient.severity = severity;

        const no: No = new No(patient);
        QueueFunctions.insertConsultQueue(no);
    }

    // consult(patient: No) {
            
    // }
}

export const HospitalFunctions: HospitalServices = new HospitalServices();