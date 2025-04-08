import { Patient } from "../models/patient";
import { ValidadeCPF } from "../utils/validateCPF";

export class PatientRegistration {
    register(data: {name: string; dob: Date; cpf: string, contact: string}): Patient {
        const verify = ValidadeCPF(data.cpf);
        if (verify === true) {
            const temp: Patient = new Patient(data.name, data.dob, data.cpf, data.contact);
            return temp;
        } else {
            throw new Error('Cpf Inválido')
        }
    }
}

export const patientFunctions: PatientRegistration = new PatientRegistration();