import { NodeTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { Reception } from "../models/careFlow";

export class PatientServices {
    static async register(data: Reception['patient']): Promise<string> {
        const no: NodeTriage = new NodeTriage(data.name);
        QueueServices.insertTriageQueue(no);
    
        // const patient = await prisma.patient.create({
        //     data: {
        //         name: data.name,
        //         dob: new Date(data.dob),
        //         maritalStatus: data.maritalStatus,
        //         cpf: data.cpf,
        //         rg: data.rg,
        //         contacts: data.contacts,
        //         gender: data.gender,
        //         healthPlan: data.healthPlan,
        //         address: data.address,
        //     }
        // });
    
        return 'Paciente Cadastrado com Sucesso!';
    };

    static async list() {
        // await prisma.patient.findMany();
    };
};