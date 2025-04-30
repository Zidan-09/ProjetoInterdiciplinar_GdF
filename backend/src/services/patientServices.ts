import { Patient } from "../models/patient";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { Registration } from "../models/interfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PatientRegistration {
    static async register(data: Registration['patient']): Promise<boolean> {
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
    }

    static list() {
        
    }
};