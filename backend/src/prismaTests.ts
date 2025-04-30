export const prisma = {
    patient: {
      create: async (data: any) => {
        console.log('[MOCK] Criando paciente:', data);
        return { id: 1, ...data }; // Simula o retorno
      },
      findMany: async () => {
        return [{ id: 1, name: 'Paciente Fictício', cpf: '123' }];
      }
    },
    recepcionist: {
      create: async (data: any) => {
        console.log('[MOCK] Criando recepcionista', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return [{id: 1, name: 'Recepcionista Fictício', cpf: '321'}];
      }
    },
    nurse: {
      create: async (data: any) => {
        console.log('[MOCK] Criando enfermeiro', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return [{id: 1, name: 'Enfermeiro Fictício', cpf: '316'}];
      }
    },
    doctor: {
      create: async (data: any) => {
        console.log('[MOCK] Criando médico', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return [{id: 1, name: 'Médico Fictício', cpf: '567'}];
      }
    },
    admin: {
      create: async (data: any) => {
        console.log('[MOCK] Criando admin', data);
        return { id: 1, ...data };
      },
      findMany: async () => {
        return [{id: 1, name: 'Admin Fictício', cpf: '987'}];
      }
    }
  };