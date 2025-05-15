import { StartConsult, EndConsult } from "../../models/careFlow";
import { Consult } from "../../models/hospital";
import { openDb } from "../../db";

const db = openDb();

export class ConsultService {
    static async startConsult(data: StartConsult): Promise<number> {
        const consult: Consult = new Consult(data.doctor_id, 1); // Tirar o 1 e botar patient_id
        // const [result]: any = await db.execute('INSERT INTO Consults (patient_id, doctor_id, checkInConsult) VALUES (?, ?, NOW())', [consult.patient_id, consult.doctor_id]); MySQL
        const result: any = (await db).run(`INSERT INTO Consult (patient_id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [consult.patient_id, consult.doctor_id]);
        const consult_id: number = result.lastID;
        return consult_id
    };

    static async endConsult(data: EndConsult) {
        // const consult: any = db.query('SELECT * FROM Consults WHERE id = ?', [data.id]); MySQL
        const consult: any = (await db).get('SELECT * FROM Consult WHERE id = ?', [data.id]);
        consult.checkOutConsult = new Date();
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        // db.execute('UPDATE Patients SET checkOutConsult = ?, diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?', [consult.checkOutConsult, consult.diagnosis, consult.prescriptions, consult.notes, data.id]) MySQL
        (await db).run('UPDATE Patients SET checkOutConsult = ?, diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?', [consult.checkOutConsult, consult.diagnosis, consult.prescriptions, consult.notes, data.id])
        return consult;
    };
};