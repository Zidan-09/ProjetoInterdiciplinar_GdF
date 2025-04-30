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

export interface Registration {
    patient: PatientData;
    attend: AttendData;
}