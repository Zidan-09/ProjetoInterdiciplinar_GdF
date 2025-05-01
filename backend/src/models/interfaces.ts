import { Interface } from "readline";
import { Gender, MaritalStatus } from "./patient";

interface PatientData {
    name: string;
    dob: string | Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contacts: string[];
    gender: Gender;
    healthPlan: string;
    address: string;
};

interface AttendData {
    ticket: string;
    recepcionist_id: number;
}

export interface RegistrationPatient {
    patient: PatientData;
    attend: AttendData;
}

export interface RecepcionistData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
    weeklyHours: number
}

export interface NurseData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
    coren: string;
    department: string;
    roleType: string;
    weeklyHours: number;
    onDuty: Boolean;
}

export interface DoctorData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
    crm: string;
    specialty: string;
    weeklyHours: number;
    onDuty: Boolean;
}

export interface AdminData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
}

export interface CriteriaData {
    "immediate": 0,
    "veryUrgent": 10,
    "urgent": 60,
    "lowUrgency": 120,
    "nonUrgent": 240
}