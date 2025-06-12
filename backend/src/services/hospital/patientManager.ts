import { NodeTriage } from "../../utils/queueUtils/createNode";
import { Patient } from "../../entities/patient";
import { db } from "../../db";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { TriageQueue } from "../../entities/queue";

export class PatientManager {
    static async register(data: Patient): Promise<number|void> {
        try {
            const valid: boolean = await ValidateRegister.verifyPatient(data);

            if (valid) {
                const patient: any = await db.execute('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address]);
                const patient_id: number = patient.lastID!;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!);
                TriageQueue.insertQueue(nodeTriage);
                return patient_id

            } else {
                const patient: any = await db.execute('SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?', [data.name, data.cpf, data.rg]);
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

    static async list(): Promise<Patient[]|void> {
        try {
            const patients: Patient[] | undefined = await db.execute('SELECT * FROM Patient');

            if (patients) {
                return patients
            }

        } catch (error) {
            console.error(error);
        }
    };

    static async findByCpf(cpf: string): Promise<Patient|void> {
        try {
            const patient: Patient | undefined = await db.execute('SELECT * FROM Patient WHERE cpf = ?', [cpf]);

            if (patient) {
                return patient
            }

        } catch (error) {
            console.error(error);
        }
    };

    static async findById(id: number): Promise<Patient|void> {
        try {
            const patient: Patient | undefined = await db.execute('SELECT * FROM Patient WHERE id = ?', [id]);

            if (patient) {
                return patient
            }
        } catch (error) {
            console.error(error);
        }
    };
}