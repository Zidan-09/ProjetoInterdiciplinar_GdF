import { Nurse } from "../models/hospitalStaff";
import { Severity } from "../models/patient";
import { Patient } from "../models/patient";

export class Triage {
    id: number;
    nurse: Nurse;
    patient: Patient;
    vitalSigns: undefined | {
            bloodPreassure: {
                systolicPreassure: number;
                diastolicPreassure: number;
            };
            heartRate: number;
            respiratoryRate: number;
            bodyTemperature: number;
            oxygenSaturation: number;
        };
    severity: undefined | Severity;
    simptoms: undefined | string[];
    painLevel: number;

        constructor(nurse: Nurse, patient: Patient, vitalSigns: {bloodPreassure: {systolicPreassure: number, diastolicPreassure: number}, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}, severity: Severity, simptoms: string[], painLevel: number) {
            this.id = 0;
            this.nurse = nurse;
            this.patient = patient;
            this.vitalSigns = vitalSigns;
            this.severity = severity;
            this.simptoms = simptoms;
            this.painLevel = painLevel;
        }
}