import { Patient } from "../models/patient";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { Attend } from "../models/careFlow";
import { Convert } from "../utils/convertJson";

export class PatientRegistration {
    static register(json: any): Patient {
        const patient: Patient = Convert.JsonToPatient(json);
        const attend: Attend = Convert.JsonToAttend(json);
        const no: NoTriage = new NoTriage(attend);
        QueueServices.insertTriageQueue(no);
        console.log('Paciente Cadastrado com Sucesso!')
        return patient;
    }
}