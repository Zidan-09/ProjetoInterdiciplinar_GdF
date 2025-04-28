import { Nurse } from "../models/hospitalStaff";
import { Severity } from "../models/patient";

export class Triage {
    nurse: Nurse;
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

        constructor(nurse: Nurse, vitalSigns: {bloodPreassure: {systolicPreassure: number, diastolicPreassure: number}, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}, severity: Severity, simptoms: string[], painLevel: number) {
            this.nurse = nurse;
            this.vitalSigns = vitalSigns;
            this.severity = severity;
            this.simptoms = simptoms;
            this.painLevel = painLevel;
        }
}