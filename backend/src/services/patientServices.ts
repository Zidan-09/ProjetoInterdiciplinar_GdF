import { Patient } from "../models/patient";
import { PatientData } from "../utils/convertJson";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { Attend } from "../models/attend";
import { Recepcionist } from "../models/hospitalStaff";
import { NoAttend } from "../utils/createNoAttend";

export class PatientRegistration {
    static register(data: PatientData, recepcionist: Recepcionist, ticket: string): Patient {
        const temp: Patient = new Patient(data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address);
        const attend: Attend = new Attend(ticket, recepcionist);
        const no: NoTriage = new NoTriage(attend);
        QueueServices.insertTriageQueue(no);
        console.log('Paciente Cadastrado com Sucesso!')
        return temp;
    }
}