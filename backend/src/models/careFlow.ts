import { Recepcionist } from "../models/hospitalStaff";
import { Doctor } from "../models/hospitalStaff";
import { Nurse } from "../models/hospitalStaff";

export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'
export type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'

export class Attend {
    id: number;
    ticket: string;
    recepcionist: Recepcionist;
    checkIn: Date;
    status: Status;

    constructor(ticket: string, recepcionist: Recepcionist) {
        this.id = 0;
        this.ticket = ticket;
        this.recepcionist = recepcionist;
        this.checkIn = new Date();
        this.status = 'In triage queue';
    }
};

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
};

export class Consult {
    id: number;
    doctor: Doctor;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;

    constructor(doctor: Doctor) {
        this.id = 0;
        this.doctor = doctor;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
        this.diagnosis = null;
        this.prescriptions = null;
        this.notes = null;
    }
};