import { NodeTriage } from "../../utils/createNode";
import { Patient } from "../../models/patient";
import { InsertQueue } from "../queue/services/insertQueue";
import { openDb } from "../../db";
import { ValidateRegister } from "../../utils/validators";

const db = openDb();

export class PatientManager {
    static async register(data: Patient): Promise<[boolean, number, string]> {
        try {
            const valid: boolean = await ValidateRegister.verifyPatient(data);
            
            if (valid) {
                const patient = (await db).run('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address]);
                const patient_id: number = (await patient).lastID!;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!);
                InsertQueue.insertTriageQueue(nodeTriage);
        
                return [true, patient_id, `Paciente ${data.name} cadastrado(a) com sucesso`]
            } else {
                const patient_id: any = (await db).get('SELECT id FROM Patient WHERE name = ? AND cpf = ? AND rg = ?', [data.name, data.cpf, data.rg]);
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!);
                InsertQueue.insertTriageQueue(nodeTriage);
                return [true, patient_id, `Paciente ${data.name} cadastrado(a) com sucesso`];
            }

        } catch (error) {
            console.error(error);
            return [false, 0, 'Erro ao cadastrar o paciente']
        }
    };

    static async list() {
        try {
            const patients = (await db).all('SELECT * FROM Patient');
            return patients
        } catch (error) {
            console.error(error);
            return 'Erro ao listar pacientes cadastrados'
        }
    }
}