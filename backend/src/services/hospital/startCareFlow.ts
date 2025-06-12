import { CareFlow } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { db } from "../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const CareFlowService = {
    async startCareFlow(patient_id: number, data: CareFlow): Promise<number|undefined> {
        try {
            const [result] = await db.execute<ResultSetHeader>(`INSERT INTO CareFlow (patient_id, receptionist_id, checkInHospital, status) VALUES (?, ?, NOW(), ?)`, [patient_id, data.receptionist_id, Status.WaitingTriage]);
            const careFlow_Id: number = result.insertId
            return careFlow_Id;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async noShow(careFlow_id: number): Promise<RowDataPacket|undefined> {
        try {
            await db.execute<ResultSetHeader>('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.NoShow, careFlow_id]);
            const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM CareFlow WHERE id = ?', [careFlow_id]);
            if (!rows.length) {
                return undefined;
            } else {
                return rows[0]
            }
            
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}