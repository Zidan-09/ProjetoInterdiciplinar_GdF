import { CareFlow } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { openDb } from "../../db";


export class CareFlowService {
    static async startCareFlow(patient_id: number, data: CareFlow) {
        const db = await openDb();
        try {
            const careFlow = await db.run(`INSERT INTO CareFlow (patient_id, receptionist_id, checkInHospital, status) VALUES (?, ?, datetime('now'), ?)`, [patient_id, data.receptionist_id, Status.WaitingTriage]);
            const careFlowId: any = careFlow.lastID!
            return careFlowId;
        } catch (error) {
            console.error(error);
        }
    };

    static async noShow(careFlow_id: number) {
        const db = await openDb();
        try {
            await db.run('UPDATE CareFlow SET status = ?', [Status.NoShow]);
            
        } catch (error) {
            console.error(error);
        }
    }
}