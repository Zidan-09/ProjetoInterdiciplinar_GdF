export type Gender = 'Male' | 'Female' | 'Other';
export type MaritalStatus = 'Single' | 'Married' | 'Divorcied' | 'Separated' | 'Widowed';

export interface Patient {
    name: string;
    dob: string | Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contact: string;
    gender: Gender;
    healthPlan: string;
    address: string;
};