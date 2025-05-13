import { NodeConsult, NodeTriage } from "../utils/createNode";
import { Triage, StartConsult, EndConsult, TriageCategory } from "../models/careFlow";
import { Patient } from "../models/patient";
import { Consult } from "../models/hospital";
// import { db } from "../db";
import { InsertQueue } from "./queue/services/insertQueue";
import { SearchQueue } from "./queue/managers/searchQueue";
import { criteria } from "../models/criteria";
import { initDb, openDb } from "../db";

const db = openDb();

export class HospitalServices {
    static async register(data: Patient) {
        // const patient: any = await db.execute('INSERT INTO Patients (name, dob, maritalStatus, cpf, rg, contacts, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', MySQL
        //     [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address]
        // );
        const patient = (await db).run('INSERT INTO Patients (name, dob, maritalStatus, cpf, rg, contacts, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address])
        const patient_id = (await patient).lastID;
        const nodeTriage: NodeTriage = new NodeTriage(patient_id!);
        InsertQueue.insertTriageQueue(nodeTriage);

        return `Paciente ${data.name} cadastrado(a) com sucesso`
    }

    static async triage(data: Triage) {
        // const [result]: any = await db.execute('INSERT INTO Triages (nurse_id, patient_id, vitalSigns, simptoms, painLevel, triageCategory) VALUES (?, ?, ?, ?, ?, ?)', [data.nurse_id, data.patient_id, data.vitalSigns, data.simptoms, data.painLevel, data.triageCategory]); MySQL
        const [result]: any = (await db).run('INSERT INTO Triages (nurse_id, patient_id, vitalSigns, simptoms, painLevel, triageCategory) VALUES (?, ?, ?, ?, ?, ?)', [data.nurse_id, data.patient_id, data.vitalSigns, data.simptoms, data.painLevel, data.triageCategory])
        const no: NodeConsult = new NodeConsult(data);
        InsertQueue.insertConsultQueue(no);
        return result;
    };

    static async changeSeverity(patient_id: number, newSeverity: TriageCategory): Promise<[boolean, string]> {
        const search: string | NodeConsult = SearchQueue.search(patient_id);

        if (typeof search === 'string') {
            return [false, search]
        } else {
            switch (newSeverity) {
                case 'Non-Urgent': 
                    search.triageCategory = 1;
                    search.limitDate = {
                        limitHours: Math.round(criteria.nonUrgent / 60),
                        limitMinuts: criteria.nonUrgent % 60
                    };
                    break;
                case 'Standard':
                    search.triageCategory = 2;
                    search.limitDate = {
                        limitHours: Math.round(criteria.standard / 60),
                        limitMinuts: criteria.standard % 60
                    };
                    break;
                case 'Urgent':
                    search.triageCategory = 3;
                    search.limitDate = {
                        limitHours: Math.round(criteria.urgent / 60),
                        limitMinuts: criteria.urgent % 60
                    };
                    break;
                case 'VeryUrgent':
                    search.triageCategory = 4;
                    search.limitDate = {
                        limitHours: Math.round(criteria.veryUrgent / 60),
                        limitMinuts: criteria.veryUrgent % 60
                    };
                    break;
                case 'Immediate':
                    search.triageCategory = 5;
                    search.limitDate = {
                        limitHours: Math.round(criteria.immediate / 60),
                        limitMinuts: criteria.immediate % 60
                    };
                    search.maxPriority = true;
                    break;
            }
            return [true, 'Classificação de risco alterada com sucesso']
        }
    };

    static async startConsult(data: StartConsult): Promise<number> {
        const consult: Consult = new Consult(data.doctor_id, 1); // Tirar o 1 e botar patient_id
        // const [result]: any = await db.execute('INSERT INTO Consults (patient_id, doctor_id, checkInConsult) VALUES (?, ?, NOW())', [consult.patient_id, consult.doctor_id]); MySQL
        const [result]: any = (await db).run(`INSERT INTO Consults (patient_id, doctor_id, checkInConsult) VALUES (?, ?, datetime('now'))`, [consult.patient_id, consult.doctor_id]);
        const consult_id: number = result.lastID;
        return consult_id
    };

    static async endConsult(data: EndConsult) {
        // const consult: any = db.query('SELECT * FROM Consults WHERE id = ?', [data.id]); MySQL
        const consult: any = (await db).get('SELECT * FROM Consults WHERE id = ?', [data.id]);
        consult.checkOutConsult = new Date();
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        // db.execute('UPDATE Patients SET checkOutConsult = ?, diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?', [consult.checkOutConsult, consult.diagnosis, consult.prescriptions, consult.notes, data.id]) MySQL
        (await db).run('UPDATE Patients SET checkOutConsult = ?, diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?', [consult.checkOutConsult, consult.diagnosis, consult.prescriptions, consult.notes, data.id])
        return consult;
    };
};