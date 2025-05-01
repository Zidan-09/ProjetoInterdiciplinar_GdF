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
  }
}

export const patients: {}[] = [];
export const recepcionists: {}[] = [];
export const nurses: {}[] = [];
export const doctors: {}[] = [];
export const admins: {}[] = [];

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
    }
  };