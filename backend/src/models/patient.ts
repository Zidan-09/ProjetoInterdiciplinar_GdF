export class Patient {
    name: string;
    dob: Date;
    maritalStatus: 'Single' | 'Married' | 'Divorcied' | 'Separated' | 'Widowed';
    cpf: string;
    rg: string;
    contacts: string[];
    gender: 'Male' | 'Female' | 'Other';
    healthPlan: string;
    address: string;

    constructor(name: string, dob: Date, maritalStatus: string, cpf: string, rg: string, contact: string[], gender: string, healthPlan: string, address: string) {
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
};