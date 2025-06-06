import { openDb } from "../../db";

export class ShowReports {
    static async queueTime(period: Date): Promise<{ triageQueueTime: number, consultQueueTime: number }> {
        const db = await openDb();
        
        const checkInTriage = await db.all('SELECT checkInTriage FROM Triage WHERE checkInTriage >= ? AND checkInTriage <= ?', [period.setHours(0, 0, 0, 0), period.setHours(23, 59, 59, 999)]);
        const checkInHospital = await db.all('SELECT checkInHospital FROM CareFlow WHERE checkInHospital >= ? AND checkInHospital <= ?', [period.setHours(0, 0, 0, 0), period.setHours(23, 59, 59, 999)]);

        const checkInConsult = await db.all('SELECT checkInConsult FROM Consult WHERE checkInConsult >= ? AND checkInConsult <= ?', [period.setHours(0, 0, 0, 0), period.setHours(23, 59, 59, 999)]);
        const checkOutTriage = await db.all('SELECT checkOutTriage FROM Triage WHERE checkOutTriage >= ? AND checkOutTriage <= ?', [period.setHours(0, 0, 0, 0), period.setHours(23, 59, 59, 999)])

        let triageQueueTime: number = 0;
        let consultQueueTime: number = 0;

        for (let i = 0; i < Math.min(checkInHospital.length, checkInTriage.length); i++) {
            triageQueueTime += checkInTriage[i] - checkInHospital[i];
        }

        for (let i = 0; i < Math.min(checkInConsult.length, checkOutTriage.length); i++) {
            consultQueueTime += checkInConsult[i] - checkOutTriage[i];
        }

        const triageResult: number = triageQueueTime / Math.min(checkInHospital.length, checkInTriage.length);
        const consultResult: number = consultQueueTime / Math.max(checkInConsult.length, checkOutTriage.length);

        return {
            triageQueueTime: triageResult,
            consultQueueTime: consultResult
        }
    };
    
    static async careFlow() {
        const db = await openDb();
        
        
    };
    
    static async patient() {
        const db = await openDb();
        
    };
    
    static async hospital() {
        const db = await openDb();

    };
};




// FILA -> tempo médio de espera para ir para a triagem / consulta
// ATENDIMENTO -> tempo médio de consulta, tempo médio de triagem, quantos pacientes foram atendidos por cada profissional, sintomas mais comuns
// PACIENTE -> quantidade de pacientes, quantidade de pacientes que foram embora antes da consulta, quantidade de cada classificação de risco, tempo total de permanência no hospital,
// HOSPITAL -> Horário de pico de pacientes presentes