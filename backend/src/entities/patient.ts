import { Gender, MaritalStatus } from "../utils/enuns/generalEnuns";

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