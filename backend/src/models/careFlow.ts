import { Doctor } from "../models/hospitalStaff";
import { Nurse } from "../models/hospitalStaff";
import { Patient } from "./patient";

export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'
export type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'

export class Attend {
    ticket: string;
    recepcionist_id: number;
    checkIn: Date;

    constructor(ticket: string, recepcionist_id: number) {
        this.ticket = ticket;
        this.recepcionist_id = recepcionist_id;
        this.checkIn = new Date();
    }
};

export class Triage {
    id: number;
    patient: Patient['name'];
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

        constructor(patient: Patient['name'], nurse: Nurse, vitalSigns: {bloodPreassure: {systolicPreassure: number, diastolicPreassure: number}, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number}, severity: Severity, simptoms: string[], painLevel: number) {
            this.id = 0;
            this.patient = patient;
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