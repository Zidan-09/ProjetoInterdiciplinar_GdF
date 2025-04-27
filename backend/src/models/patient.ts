export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'
export type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'
export type MaritalStatus = 'Single' | 'Married' | 'Divorcied' | 'Separated'
export type Gender = 'Male' | 'Female' | 'Other'

export class Patient {
    id: number;
    name: string;
    dob: Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contact: string[];
    gender: Gender;
    healthPlan: string;
    address: string;

    constructor(name: string, dob: Date, maritalStatus: MaritalStatus, cpf: string, rg: string, contact: string[], gender: Gender, healthPlan: string, address: string) {
        this.id = 0;
        this.name = name;
        this.dob = dob;
        this.maritalStatus = maritalStatus;
        this.cpf = cpf;
        this.rg = rg;
        this.contact = contact;
        this.gender = gender;
        this.healthPlan = healthPlan;
        this.address = address;
    }
}