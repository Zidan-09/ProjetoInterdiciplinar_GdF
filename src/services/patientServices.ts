import { Patient, MaritalStatus, Gender } from "../models/patient";
import { PatientData } from "../utils/convertJson";
import { ValidateRegister } from "../utils/validateRegister";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { Attend } from "../careFlow/attend";

export class PatientRegistration {
    static register(data: PatientData): Patient {
        const verification = ValidateRegister.verify(data.id);
        const temp: Patient = new Patient(data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address);
            
        const no: NoTriage = new NoTriage(temp);
        QueueServices.insertTriageQueue(no);
        console.log('Paciente Cadastrado com Sucesso!')
        return temp;
    }
}