import { NodeTriage } from "../../utils/queueUtils/createNode";
import { Patient } from "../../entities/patient";
import { db } from "../../db";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { TriageQueue } from "../../entities/queue";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PatientManager {
    static async register(data: Patient): Promise<number|undefined> {
        try {
            const valid: boolean | undefined = await ValidateRegister.verifyPatient(data);

            if (valid) {
                const [result] = await db.execute<ResultSetHeader>('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address]);
                const patient_id: number = result.insertId;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id);
                TriageQueue.insertQueue(nodeTriage);
                return patient_id

            } else {
                const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?', [data.name, data.cpf, data.rg]);
                const patient = result[0];
                const patient_id: number = patient.id;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!)
                TriageQueue.insertQueue(nodeTriage);
                return patient_id
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    static async list(): Promise<RowDataPacket[]|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient');

            if (result) {
                return result
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    static async findByCpf(cpf: string): Promise<RowDataPacket|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient WHERE cpf = ?', [cpf]);

            if (result) {
                return result[0]
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    static async findById(id: number): Promise<RowDataPacket|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient WHERE id = ?', [id]);

            if (result) {
                return result[0]
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    };
}