import { StartConsult, EndConsult } from "../../models/careFlow";
import { Consult } from "../../models/hospital";
import { openDb } from "../../db";

const db = openDb();

export class ConsultService {
    static async startConsult(data: StartConsult): Promise<number> {
        const consult: Consult = new Consult(data.doctor_id, data.patient_id);
        const result: any = (await db).run(`INSERT INTO Consult (patient_id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [consult.patient_id, consult.doctor_id]);
        const consult_id: number = result.lastID;
        return consult_id
    };

    static async endConsult(data: EndConsult) {
        const consult: any = (await db).get('SELECT * FROM Consult WHERE id = ?', [data.id]);
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        (await db).run(`UPDATE Consult SET checkOutConsult = datetime('now'), diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?`, [consult.diagnosis, JSON.stringify(consult.prescriptions), consult.notes, data.id])
        return consult;
    };
};