export type MaritalStatus = 'Single' | 'Married' | 'Divorcied' | 'Separated'
export type Gender = 'Male' | 'Female' | 'Other'

export class Patient {
    name: string;
    dob: Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contacts: string[];
    gender: Gender;
    healthPlan: string;
    address: string;

    constructor(name: string, dob: Date, maritalStatus: MaritalStatus, cpf: string, rg: string, contact: string[], gender: Gender, healthPlan: string, address: string) {
        this.name = name;
        this.dob = dob;
        this.maritalStatus = maritalStatus;
        this.cpf = cpf;
        this.rg = rg;
        this.contacts = contact;
        this.gender = gender;
        this.healthPlan = healthPlan;
        this.address = address;
    }
}

export interface PatientData {
    name: string;
    dob: string | Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contacts: string[];
    gender: Gender;
    healthPlan: string;
    address: string;
}