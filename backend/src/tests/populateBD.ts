import * as fs from 'fs';
import { db } from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Patient } from '../entities/patient';
import { Status } from '../utils/enuns/generalEnuns';

async function importPatientsFromJson(filePath: string) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const patients: Patient[] = JSON.parse(raw);
        const patient_ids: number[] = [];

        console.log(`Importando ${patients.length} pacientes...`);

        for (let i of patients) {
            const [result] = await db.execute<ResultSetHeader>('INSERT INTO Patient (name, dob, maritalStatus, cpf, rg, contact, gender, healthPlan, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [i.name, i.dob, i.maritalStatus, i.cpf, i.rg, i.contact, i.gender, i.healthPlan, i.address]);
            const patient_id = result.insertId;
            patient_ids.push(patient_id);
        }

        console.log('Pacientes adicionados com sucesso!')
        return patient_ids;

    } catch (error) {
        console.error(error);
    }
}

async function importCareFlowsFromJson(filePath: string, patient_ids: number[]) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const careFlows: any[] = JSON.parse(raw);
        const careFlow_ids: number[] = [];
        const [resultR] = await db.execute<RowDataPacket[]>('SELECT recep_id FROM Receptionist');
        const receptionist_id = resultR[0].recep_id;

        console.log(`Importando ${careFlows.length} atendimentos...`);

        for (let i = 0; i < careFlows.length; i++) {
            const [result] = await db.execute<ResultSetHeader>(`INSERT INTO CareFlow (receptionist_id, patient_id, checkInHospital, status) VALUES (?, ?, ?, ?)`, [receptionist_id, patient_ids[i], careFlows[i].checkInHospital, Status.WaitingTriage]);
            const careFlow_id = result.insertId;
            careFlow_ids.push(careFlow_id);
        }

        console.log('Atendimentos adicionados com sucesso!');
        return careFlow_ids;

    } catch (error) {
        console.error(error);
    }
}

async function importTriagesFromJson(filePath: string, careFlow_ids: number[]) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const triages = JSON.parse(raw);
        const [result] = await db.execute<RowDataPacket[]>('SELECT nur_id FROM Nurse');
        const nurse_id = result[0].nur_id

        console.log(`Importando ${triages.length} triagens...`);

        for (let i = 0; i < careFlow_ids.length; i++) {
            await db.execute<ResultSetHeader>("INSERT INTO Triage (triage_id, nurse_id, checkInTriage, checkOutTriage, systolicPressure, diastolicPressure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, painLevel, symptoms, triageCategory_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [careFlow_ids[i], nurse_id, triages[i].checkInTriage, triages[i].checkOutTriage, triages[i].systolicPressure, triages[i].diastolicPressure, triages[i].heartRate, triages[i].respiratoryRate, triages[i].bodyTemperature, triages[i].oxygenSaturation, triages[i].painLevel, triages[i].symptoms, triages[i].triageCategory_id]);
        }

        console.log('Triagens adicionadas com sucesso!')

    } catch (error) {
        console.error(error);
    }
}

async function importConsultsFromJson(filePath: string, careFlow_ids: number[]) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const consults = JSON.parse(raw);
        const [result] = await db.execute<RowDataPacket[]>('SELECT doc_id FROM Doctor');
        const doctor_id = result[0].doc_id

        console.log(`Importando ${consults.length} consultas...`);

        for (let i = 0; i < careFlow_ids.length; i++) {
            await db.execute<ResultSetHeader>("INSERT INTO Consult (consult_id, doctor_id, checkInConsult, checkOutConsult, diagnosis, prescriptions, notes) VALUES (?, ?, ?, ?, ?, ?, ?)", [careFlow_ids[i], doctor_id, consults[i].checkInConsult, consults[i].checkOutConsult, consults[i].diagnosis, consults[i].prescriptions, consults[i].notes]);
        }

        console.log('Triagens adicionadas com sucesso!')

    } catch (error) {
        console.error(error);
    }
}

async function start() {
    await importPatientsFromJson('../Json/test/patients.json');
}

start();