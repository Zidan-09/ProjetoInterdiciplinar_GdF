import { Patient } from "../models/patient";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "./queueService";
import { Registration } from "../models/interfaces";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// Comentado para evitar erro real
// import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient();

// Em vez disso, use um mock temporário:
export const prisma = {
    patient: {
      create: async (data: any) => {
        console.log('[MOCK] Criando paciente:', data);
        return { id: 1, ...data }; // Simula o retorno
      },
      findMany: async () => {
        return [{ id: 1, name: 'Paciente Fictício', cpf: '123' }];
      }
    }
  };
  
export class PatientServices {
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
    };

    static async list() {
        await prisma.patient.findMany();
    };
};