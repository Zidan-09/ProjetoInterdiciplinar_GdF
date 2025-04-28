import { Nurse } from "../models/hospitalStaff";

export type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'

export class Triage {
    id: number;
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
            this.id = 0;
            this.nurse = nurse;
            this.vitalSigns = vitalSigns;
            this.severity = severity;
            this.simptoms = simptoms;
            this.painLevel = painLevel;
        }
}