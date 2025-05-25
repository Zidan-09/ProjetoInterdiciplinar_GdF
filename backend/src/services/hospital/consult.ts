import { StartConsult, EndConsult } from "../../entities/careFlow";
import { openDb } from "../../db";


export class ConsultService {
    static async startConsult(data: StartConsult): Promise<number> {
        const db = await openDb();
        const row: any = await db.run(`INSERT INTO Consult (id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [data.careFlow_id, data.doctor_id]);
        const consult_id = await row.lastId
        return consult_id;
    };

    static async endConsult(data: EndConsult) {
        const db = await openDb();
        console.log(data)
        const consult = await db.run(`UPDATE Consult SET checkOutConsult = datetime('now'), diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?`, [data.diagnosis, JSON.stringify(data.prescriptions), data.notes, data.careFlow_id])
        return consult.changes;
    };
};