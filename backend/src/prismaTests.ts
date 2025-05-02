import { Consult, Triage } from "./models/careFlow";

export function somarID(tipo: string) {
  switch (tipo) {
    case 'patient':
      patientID++;
      break;
    case 'recepcionist':
      recepcionistID++;
      break;
    case 'nurse':
      nurseID++;
      break
    case 'doctor':
      doctorID++;
      break;
    case 'admin':
      adminID++;
      break;
    case 'triage':
      triageID++;
      break;
    case 'consult':
      consultID++;
      break;
  }
}

export const patients: {}[] = [];
export const recepcionists: {}[] = [];
export const nurses: {}[] = [];
export const doctors: {}[] = [];
export const admins: {}[] = [];

export const triages: Triage[] = [];
export const consults: Consult[] = [];

export let triageID: number = 1;
export let consultID: number = 1;

export let patientID: number = 1;
export let recepcionistID: number = 1;
export let nurseID: number = 1;
export let doctorID: number = 1;
export let adminID: number = 1;

export const prisma = {
    patient: {
      create: async (data: any) => {
        console.log('[MOCK] Criando paciente:', data);
        return { id: patientID, ...data };
      },
      findMany: async () => {
        return patients;
      }
    },
    recepcionist: {
      create: async (data: any) => {
        console.log('[MOCK] Criando recepcionista', data);
        return { id: recepcionistID, ...data };
      },
      findMany: async () => {
        return recepcionists;
      }
    },
    nurse: {
      create: async (data: any) => {
        console.log('[MOCK] Criando enfermeiro', data);
        return { id: nurseID, ...data };
      },
      findMany: async () => {
        return nurses;
      }
    },
    doctor: {
      create: async (data: any) => {
        console.log('[MOCK] Criando médico', data);
        return { id: doctorID, ...data };
      },
      findMany: async () => {
        return doctors;
      }
    },
    admin: {
      create: async (data: any) => {
        console.log('[MOCK] Criando admin', data);
        return { id: adminID, ...data };
      },
      findMany: async () => {
        return admins;
      }
    },
    triage: {
      create: async (data: any) => {
        const triage = new Triage(data.patient, data.nurse_id, data.vitalSigns, data.severity, data.simptoms, data.painLevel);
        triage.id = triageID;
        triageID++;
        console.log('[MOCK] Cadastrando triagem', data);
        return triage;
      }
    },
    consult: {
      create: async (data: any) => {
        const consult: Consult = new Consult(data.doctor_id);
        consult.checkInConsult = new Date();
        consult.id = consultID;
        consultID++;
        console.log('[MOCK] Cadastrando inicio da consulta')
        return consult;
      },

      end: async (data: any) => {
        let consult: Consult;
        for (let i of consults) {
          if (i.id == data.id) {
            consult = i;
          }
        }
        return consult!;
      },

      search: async (data: any) => {
        const id: number = data.id;
        return consults[id - 1];
      }
    }
  };