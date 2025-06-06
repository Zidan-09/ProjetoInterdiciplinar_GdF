import { CareFlow } from "../../entities/careFlow";
import { Status } from "../../utils/personsUtils/generalEnuns";
import { openDb } from "../../db";


export class CareFlowService {
    static async startCareFlow(patient_id: number, data: CareFlow): Promise<number|void> {
        const db = await openDb();
        try {
            const careFlow = await db.run(`INSERT INTO CareFlow (patient_id, receptionist_id, status, date) VALUES (?, ?, ?, datetime('now'))`, [patient_id, data.receptionist_id, Status.WaitingTriage]);
            const careFlowId: any = careFlow.lastID!
            return careFlowId;
        } catch (error) {
            console.error(error);
            return
        }
    }
}