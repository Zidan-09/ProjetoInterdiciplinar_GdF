export const patients: {}[] = [];
export const recepcionists: {}[] = [];
export const nurses: {}[] = [];
export const doctors: {}[] = [];
export const admins: {}[] = [];

export const prisma = {
    patient: {
      create: async (data: any) => {
        console.log('[MOCK] Criando paciente:', data);
        return { id: 1, ...data }; // Simula o retorno
      },
      findMany: async () => {
        return patients;
      }
    },
    recepcionist: {
      create: async (data: any) => {
        console.log('[MOCK] Criando recepcionista', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return recepcionists;
      }
    },
    nurse: {
      create: async (data: any) => {
        console.log('[MOCK] Criando enfermeiro', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return nurses;
      }
    },
    doctor: {
      create: async (data: any) => {
        console.log('[MOCK] Criando médico', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return doctors;
      }
    },
    admin: {
      create: async (data: any) => {
        console.log('[MOCK] Criando admin', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return admins;
      }
    }
  };