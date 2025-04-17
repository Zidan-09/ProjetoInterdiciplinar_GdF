import { Patient, MaritalStatus, Gender } from "../models/patient";
import { PatientData } from "../utils/convertJson";
import { NoTriage } from "../utils/createNoTriage";
import { ValidadeCPF } from "../utils/validateCPF";
import { QueueServices } from "./queueService";

export class PatientRegistration {
    static register(data: PatientData): Patient {
        const verify = ValidadeCPF(data.cpf);
        if (verify === true) {
            const temp: Patient = new Patient(data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address);
            
            const no: NoTriage = new NoTriage(temp);
            QueueServices.insertTriageQueue(no);
            console.log('Paciente Cadastrado com Sucesso!')
            return temp;
        } else {
            throw new Error('Cpf Inválido')
        } 
    }
}