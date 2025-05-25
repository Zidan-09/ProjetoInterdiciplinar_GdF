import { CareFlow } from "../../entities/careFlow";
import { openDb } from "../../db";

const db = openDb();

export class CareFlowService {
    static async startCareFlow(patient_id: number, data: CareFlow): Promise<number> {
        const careFlow = (await db).run(`INSERT INTO CareFlow (patient_id, receptionist_id, status, date) VALUES (?, ?, ?, datetime('now'))`, [patient_id, data.receptionist_id, 'In queue']);
        const careFlowId: number = (await careFlow).lastID!
        return careFlowId;
    }
}