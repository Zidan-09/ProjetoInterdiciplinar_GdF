import { StartConsult, EndConsult } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { db } from "../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export const ConsultService = {
    async startConsult(data: StartConsult): Promise<number|void> {
        try {
            const [result] = await db.execute<ResultSetHeader>(`INSERT INTO Consult (consult_id, doctor_id, checkInConsult) VALUES (?, ?, NOW())`, [data.careFlow_id, data.doctor_id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InConsultation, data.careFlow_id])
            const consult_id: number = result.insertId
            return consult_id;

        } catch (error) {
            console.error(error);
            return undefined;;
        }
    },

    async endConsult(data: EndConsult): Promise<RowDataPacket|undefined> {
        try {
            await db.execute(`UPDATE Consult SET checkOutConsult = NOW(), diagnosis = ?, prescriptions = ?, notes = ? WHERE consult_id = ?`, [data.diagnosis, JSON.stringify(data.prescriptions), data.notes, data.careFlow_id])
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.Attended, data.careFlow_id]);
            const [consult] = await db.execute<RowDataPacket[]>('SELECT * FROM Consult WHERE consult_id = ?', [data.careFlow_id]);
            return consult[0];
            
        } catch (error) {
            console.error(error);
            return undefined;;
        }
    }
};