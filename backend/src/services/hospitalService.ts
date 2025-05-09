import { NodeConsult, NodeTriage } from "../utils/createNode";
import { QueueServices } from "./queueService";
import { criteria } from "../models/criteria";
import { Triage, StartConsult, EndConsult, TriageCategory } from "../models/careFlow";
import { Patient } from "../models/patient";
import { Consult } from "../models/hospital";
import { lastCalled } from "../services/queueService";
import { db } from "../db";

export class HospitalServices {
    static async register(data: Patient) {
        const patient: any = await db.execute('INSERT INTO Patients (name, dob, maritalStatus, cpf, rg, contacts, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data.name, data.dob, data.maritalStatus, data.cpf, data.rg, data.contact, data.gender, data.healthPlan, data.address]
        );
        const patient_id = patient.insertId;
        const nodeTriage: NodeTriage = new NodeTriage(patient_id);
        QueueServices.insertTriageQueue(nodeTriage);

        return `Paciente ${data.name} cadastrado(a) com sucesso`
    }

    static async triage(data: Triage) {
        const [result]: any = await db.execute('INSERT INTO Triages (nurse_id, patient_id, vitalSigns, simptoms, painLevel, triageCategory) VALUES (?, ?, ?, ?, ?, ?)', [data.nurse_id, data.patient_id, data.vitalSigns, data.simptoms, data.painLevel, data.triageCategory]);
        const no: NodeConsult = new NodeConsult(data);
        QueueServices.insertConsultQueue(no);
        return result;
    };

    static async changeSeverity(patient_id: number, newSeverity: TriageCategory): Promise<string> {
        const search = QueueServices.search(patient_id);

        if (search == undefined) {
            return 'Erro'
        } else {
            search!.triage.triageCategory = newSeverity;

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
        }
        return 'Severidade Alterada!'
    };

    static async startConsult(data: StartConsult): Promise<number> {
        const consult: Consult = new Consult(data.doctor_id, lastCalled!.patient_id);
        const [result]: any = await db.execute('INSERT INTO Consults (patient_id, doctor_id, checkInConsult) VALUES (?, ?, NOW())', [consult.patient_id, consult.doctor_id]);
        const consult_id: number = result.insertId;
        return consult_id
    };

    static async endConsult(data: EndConsult) {
        const consult: any = db.query('SELECT * FROM Consults WHERE id = ?', [data.id]);
        consult.checkOutConsult = new Date();
        consult.diagnosis = data.diagnosis;
        consult.prescriptions = data.prescriptions;
        consult.notes = data.notes;
        db.execute('UPDATE Patients SET checkOutConsult = ?, diagnosis = ?, prescriptions = ?, notes = ? WHERE id = ?', [consult.checkOutConsult, consult.diagnosis, consult.prescriptions, consult.notes, data.id])
        return consult;
    };
};