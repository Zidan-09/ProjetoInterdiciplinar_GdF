import { Patient } from "../../entities/patient";
import { db } from "../../db";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const PatientManager = {
    async register(data: Patient): Promise<number|undefined> {
        try {
            const valid: boolean | undefined = await ValidateRegister.verifyPatient(data);

            if (valid) {
                const [result] = await db.execute<ResultSetHeader>('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan.toLocaleUpperCase(), data.address]);
                const patient_id: number = result.insertId;
                return patient_id

            } else {
                const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?', [data.name, data.cpf, data.rg]);
                const patient = result[0];
                const patient_id: number = patient.pat_id;
                return patient_id
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async list(): Promise<RowDataPacket[]|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient');

            if (result) {
                return result
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async findByCpf(cpf: string): Promise<RowDataPacket|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient WHERE cpf = ?', [cpf]);

            if (result) {
                return result[0]
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async findById(id: number): Promise<RowDataPacket|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM Patient WHERE pat_id = ?', [id]);

            if (result) {
                return result[0]
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}