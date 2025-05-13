import { initDb, openDb } from "../db";
import { Triage } from "../models/careFlow";
import { criteria } from "../models/criteria";
// import { db } from "../db";

const db = openDb();

async function searchTriageDB(patient_id: number) {
    const [rows]: any = (await db).get('SELECT name FROM Patients WHERE id = ?', [patient_id]);
    return [rows];
}

async function searchConsultDB(patient_id: number) {
    const [rows]: any = (await db).get('SELECT name FROM Patients WHERE id = ?', [patient_id]);;
    return [rows];
}

class NodeRecep {
    ticket: string | null;
    priority: number;
    pointer: null | NodeRecep;

    constructor(priority: number) {
        this.ticket = null;
        this.priority = priority;
        this.pointer = null;
    }
};

class NodeTriage {
    patient_id: number;
    patient_name: string;
    pointer: null | NodeTriage;

    constructor(patient_id: number) {
        this.patient_id = patient_id;
        // const [rows]: any = db.query('SELECT name FROM Patients WHERE id = ?', [patient_id]) MySQL
        const [rows]: any = searchTriageDB(patient_id);
        this.patient_name = rows[0].name;
        this.pointer = null;
    }
};

class NodeConsult {
    triage: Triage;
    patient_name: string;
    triageCategory: number;
    time: Date;
    limitDate: {
        limitHours: number;
        limitMinuts: number;
    };
    maxPriority: boolean;
    pointer: null | NodeConsult;

    constructor(patientTriage: Triage) {
        this.triage = patientTriage;
        // const [rows]: any = db.query('SELECT name FROM Patients WHERE id = ?', [patientTriage.patient_id])
        const [rows]: any = searchConsultDB(patientTriage.patient_id);
        this.patient_name = rows[0].name;
        this.pointer = null;
        this.time = new Date();
        this.maxPriority = false;

        if (!patientTriage.triageCategory) {
            throw new Error('Categoria de triagem ausente')
        };

        switch (patientTriage.triageCategory!) {
            case 'Non-Urgent': 
                this.triageCategory = 1;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + (criteria.nonUrgent / 60)),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.nonUrgent % 60)
                };
                break;
            case 'Standard':
                this.triageCategory = 2;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.standard / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.standard % 60)
                };
                break;
            case 'Urgent':
                this.triageCategory = 3;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.urgent / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.urgent % 60)
                };
                break;
            case 'VeryUrgent':
                this.triageCategory = 4;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.veryUrgent / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.veryUrgent % 60)
                };
                break;
            case 'Immediate':
                this.triageCategory = 5;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.immediate / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.immediate % 60)
                };
                this.maxPriority = true;
                break;
        }
    }
};

export { NodeConsult, NodeTriage, NodeRecep }