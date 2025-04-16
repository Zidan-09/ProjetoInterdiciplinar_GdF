export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated'
export type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'
export type MaritalStatus = 'Single' | 'Married' | 'Divorcied' | 'Widowed' | 'Separated'
export type Gender = 'Male' | 'Female' | 'Other'

export class Patient {
    name: string;
    dob: Date;
    maritalStatus: MaritalStatus;
    cpf: undefined | string;
    rg: string;
    contact: string[];
    gender: Gender;
    healthPlan: string;
    address: string;
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
    severity: Severity | undefined;
    simptoms: undefined | string[];

    constructor(name: string, dob: Date, maritalStatus: MaritalStatus, cpf: string, rg: string, contact: string[], gender: Gender, healthPlan: string, address: string) {
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