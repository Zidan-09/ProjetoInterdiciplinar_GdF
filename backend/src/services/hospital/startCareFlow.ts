import { CareFlow } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { db } from "../../db";


export class CareFlowService {
    static async startCareFlow(patient_id: number, data: CareFlow) {
        try {
            const careFlow = await db.execute(`INSERT INTO CareFlow (patient_id, receptionist_id, checkInHospital, status) VALUES (?, ?, datetime('now'), ?)`, [patient_id, data.receptionist_id, Status.WaitingTriage]);
            const careFlowId: any = careFlow.lastID!
            return careFlowId;
        } catch (error) {
            console.error(error);
        }
    };

    static async noShow(careFlow_id: number) {
        try {
            await db.execute('UPDATE CareFlow SET status = ?', [Status.NoShow]);
            
        } catch (error) {
            console.error(error);
        }
    }
}