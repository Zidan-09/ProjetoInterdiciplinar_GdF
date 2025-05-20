import { NodeTriage } from "../../utils/createNode";
import { Patient } from "../../models/patient";
// import { db } from "../db";
import { InsertQueue } from "../queue/services/insertQueue";
import { openDb } from "../../db";
import { ValidateRegister } from "../../utils/validators";

const db = openDb();

export class PatientManager {
    static async register(data: Patient) {
        try {
            const valid: boolean = await ValidateRegister.verifyPatient(data);

            if (valid) {
                const patient = (await db).run('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address])
                const patient_id = (await patient).lastID;
                const nodeTriage: NodeTriage = await NodeTriage.create(patient_id!);
                InsertQueue.insertTriageQueue(nodeTriage);
        
                return `Paciente ${data.name} cadastrado(a) com sucesso`
            } else {
                const patient_id: any = (await db).get('SELECT id FROM Patient WHERE name = ?, cpf = ?, rg = ?', [data.name, data.cpf, data.rg]);
                return patient_id;
            }

        } catch (error) {
            console.error(error);
            return 'Erro ao cadastrar o paciente'
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