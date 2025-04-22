export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'
export type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'
export type MaritalStatus = 'Single' | 'Married' | 'Divorcied' | 'Separated'
export type Gender = 'Male' | 'Female' | 'Other'

export class Patient {
    name: string;
    dob: Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contact: string[];
    gender: Gender;
    healthPlan: string;
    address: {
        street: string;
        number: number;
        neighborhood: string;
    };
    checkIn: Date;
    status: Status;
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

    constructor(name: string, dob: Date, maritalStatus: MaritalStatus, cpf: string, rg: string, contact: string[], gender: Gender, healthPlan: string, address: {street: string, number: number, neighborhood: string}) {
        this.name = name;
        this.dob = dob;
        this.maritalStatus = maritalStatus;
        this.cpf = cpf;
        this.rg = rg;
        this.contact = contact;
        this.gender = gender;
        this.healthPlan = healthPlan;
        this.address = address;
        this.checkIn = new Date();
        this.status = 'In triage queue'
        this.vitalSigns = undefined;
        this.severity = undefined;
        this.simptoms = undefined;
    }
}