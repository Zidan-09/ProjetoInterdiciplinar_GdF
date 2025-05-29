import { StartConsult, EndConsult, Status } from "../../entities/careFlow";
import { openDb } from "../../db";


export class ConsultService {
    static async startConsult(data: StartConsult): Promise<number|void> {
        const db = await openDb();

        try {
            const row: any = await db.run(`INSERT INTO Consult (consult_id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [data.careFlow_id, data.doctor_id]);
            await db.run('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InConsultation, data.careFlow_id])
            const consult_id: number = await row.lastId
            return consult_id;
        } catch (error) {
            console.error(error);
            return;
        }
    };

    static async endConsult(data: EndConsult) {
        const db = await openDb();

        try {
            await db.run(`UPDATE Consult SET checkOutConsult = datetime('now'), diagnosis = ?, prescriptions = ?, notes = ? WHERE consult_id = ?`, [data.diagnosis, data.prescriptions, data.notes, data.careFlow_id])
            await db.run('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.Attended, data.careFlow_id])
            return await db.get('SELECT * FROM Consult WHERE consult_id = ?', [data.careFlow_id]);
        } catch (error) {
            console.error(error);
            return;
        }
    };
};