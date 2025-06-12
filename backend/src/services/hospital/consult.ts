import { StartConsult, EndConsult } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { db } from "../../db";


export class ConsultService {
    static async startConsult(data: StartConsult): Promise<number|void> {
        try {
            const row: any = await db.execute(`INSERT INTO Consult (consult_id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [data.careFlow_id, data.doctor_id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InConsultation, data.careFlow_id])
            const consult_id: number = await row.lastId
            return consult_id;

        } catch (error) {
            console.error(error);
            return;
        }
    };

    static async endConsult(data: EndConsult) {
        try {
            await db.execute(`UPDATE Consult SET checkOutConsult = datetime('now'), diagnosis = ?, prescriptions = ?, notes = ? WHERE consult_id = ?`, [data.diagnosis, JSON.stringify(data.prescriptions), data.notes, data.careFlow_id])
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.Attended, data.careFlow_id])
            return await db.execute('SELECT * FROM Consult WHERE consult_id = ?', [data.careFlow_id]);
        } catch (error) {
            console.error(error);
            return;
        }
    };
};