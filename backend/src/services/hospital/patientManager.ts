import { NodeTriage } from "../../utils/queueUtils/createNode";
import { Patient } from "../../entities/patient";
import { openDb } from "../../db";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { TriageQueue } from "../../entities/queue";
import { PatientResponses } from "../../utils/personsUtils/generalEnuns";

export class PatientManager {
    static async register(data: Patient): Promise<number|void> {
        const db = await openDb();

        try {
            const valid: boolean = await ValidateRegister.verifyPatient(data);

            if (valid) {
                const patient: any = await db.run('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address]);
                const patient_id: number = patient.lastID!;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!);
                TriageQueue.insertQueue(nodeTriage);
                return patient_id

            } else {
                const patient: any = await db.get('SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?', [data.name, data.cpf, data.rg]);
                const patient_id: number = patient.id;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!)
                TriageQueue.insertQueue(nodeTriage);
                return patient_id
            }

        } catch (error) {
            console.error(error);
            return;
        }
    };

    static async list() {
        const db = await openDb();
        try {
            const patients = await db.all('SELECT * FROM Patient');
            return patients
        } catch (error) {
            console.error(error);
            return PatientResponses.Error
        }
    }
}