import { StartConsult, EndConsult } from "../../entities/careFlow";
import { openDb } from "../../db";


export class ConsultService {
    static async startConsult(data: StartConsult): Promise<number|void> {
        const db = await openDb();

        try {
            const row: any = await db.run(`INSERT INTO Consult (id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [data.careFlow_id, data.doctor_id]);
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
            const consult: any = await db.run(`UPDATE Consult SET checkOutConsult = datetime('now'), diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?`, [data.diagnosis, JSON.stringify(data.prescriptions), data.notes, data.careFlow_id])
            return await consult.changes;
        } catch (error) {
            console.error(error);
            return;
        }
    };
};