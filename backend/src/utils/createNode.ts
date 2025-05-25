import { openDb } from "../db";
import { Triage } from "../entities/careFlow";
import { criteria } from "../entities/criteria";
// import { db } from "../db";



async function searchCareFlow(careFlowId: number) {
    const db = await openDb()
    const row: any = await db.get('SELECT * FROM CareFlow WHERE id = ?', [careFlowId])
    console.log(row)
    const name = await searchPatientDB(row.patient_id)
    return [row.patient_id, name]
}

async function searchPatientDB(patient_id: number) {
    const db = await openDb()
    const rows: any = await db.get('SELECT * FROM Patient WHERE id = ?', [patient_id]);
    return rows;
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

    constructor(patient_id: number, patient_name: string) {
        this.patient_id = patient_id;
        this.patient_name = patient_name;
        this.pointer = null;
    }

    static async create(patient_id: number): Promise<NodeTriage> {
        const row: any = await searchPatientDB(patient_id);
        return new NodeTriage(patient_id, row.name);
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

    constructor(patientTriage: Triage, patient_name: string) {
        this.triage = patientTriage;
        this.patient_name = patient_name;
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

    static async create(patientTriage: Triage) {
        const row: any = await searchCareFlow(patientTriage.careFlow_id);
        return new NodeConsult(patientTriage, row[1].name)
    }
};

export { NodeConsult, NodeTriage, NodeRecep }