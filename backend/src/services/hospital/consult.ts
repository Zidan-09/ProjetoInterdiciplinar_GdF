import { EndConsult } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { db } from "../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Jwt } from "../../utils/systemUtils/security";


export const ConsultService = {
    async startConsult(careFlow_id: number, token: string): Promise<number|undefined> {
        try {
            const doctor_id = Jwt.verifyLoginToken(token);

            if (!doctor_id) {
                return undefined;
            }

            await db.execute<ResultSetHeader>(`INSERT INTO Consult (consult_id, doctor_id, checkInConsult) VALUES (?, ?, NOW())`, [careFlow_id, doctor_id.id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InConsultation, careFlow_id])
            return careFlow_id;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async endConsult(careFlow_id: number, data: EndConsult): Promise<RowDataPacket|undefined> {
        try {
            await db.execute(`UPDATE Consult SET checkOutConsult = NOW(), diagnosis = ?, prescriptions = ?, notes = ? WHERE consult_id = ?`, [data.diagnosis, JSON.stringify(data.prescriptions), data.notes, careFlow_id])
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.Attended, careFlow_id]);
            const [consult] = await db.execute<RowDataPacket[]>('SELECT * FROM Consult WHERE consult_id = ?', [careFlow_id]);
            return consult[0];
            
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
};