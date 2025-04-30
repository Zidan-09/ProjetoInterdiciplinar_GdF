import { prisma } from "../prismaTests";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { RegistrationPatient } from "../models/interfaces";

export class PatientServices {
    static async register(data: RegistrationPatient['patient']): Promise<boolean> {
        const no: NoTriage = new NoTriage(data.name);
        QueueServices.insertTriageQueue(no);
    
        await prisma.patient.create({
            data: {
                name: data.name,
                dob: new Date(data.dob),
                maritalStatus: data.maritalStatus,
                cpf: data.cpf,
                rg: data.rg,
                contacts: data.contacts,
                gender: data.gender,
                healthPlan: data.healthPlan,
                address: data.address,
            }
        });
    
        return true;
    };

    static async list() {
        await prisma.patient.findMany();
    };
};