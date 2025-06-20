import { Status } from "../../utils/enuns/generalEnuns";
import { db } from "../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Jwt } from "../../utils/systemUtils/security";

export const CareFlowService = {
    async startCareFlow(patient_id: number, token: string): Promise<number|undefined> {
        try {
            const receptionist_id = Jwt.verifyLoginToken(token);

            if (!receptionist_id) {
                return undefined;
            }

            const [result] = await db.execute<ResultSetHeader>(`INSERT INTO CareFlow (receptionist_id, patient_id, checkInHospital, status) VALUES (?, ?, NOW(), ?)`, [receptionist_id.id, patient_id, Status.WaitingTriage]);
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