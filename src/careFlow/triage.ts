import { Nurse } from "../models/hospitalStaff";
import { Patient, Severity } from "../models/patient";
import { Attend } from "./attend";

export class Triage {
    nurse: Nurse;
    attend: Attend;
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

        constructor(nurse: Nurse, attend: Attend, vitalSigns: {bloodPreassure: {systolicPreassure: number, diastolicPreassure: number}, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}, severity: Severity, simptoms: string[], painLevel: number) {
            this.nurse = nurse;
            this.attend = attend;
            this.vitalSigns = vitalSigns;
            this.severity = severity;
            this.simptoms = simptoms;
            this.painLevel = painLevel;
        }
}