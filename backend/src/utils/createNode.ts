import { Patient } from "../models/patient";
import { Triage } from "../models/careFlow";
import { criteria } from "../models/criteria";

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
    patient: Patient;
    pointer: null | NodeTriage;

    constructor(patient: Patient) {
        this.patient = patient;
        this.pointer = null;
    }
};

class NodeConsult {
    triage: Triage;
    severity: number;
    time: Date;
    limit: number;
    pointer: null | NodeConsult;

    constructor(patientTriage: Triage) {
        this.triage = patientTriage;
        this.pointer = null;
        this.time = new Date();

        if (!patientTriage.triageCategory) {
            throw new Error('Categoria de triagem ausente')
        };

        switch (patientTriage.triageCategory!) {
            case 'Non-Urgent': 
                this.severity = 1;
                this.limit = criteria.nonUrgent;
                break;
            case 'Standard':
                this.severity = 2;
                this.limit = criteria.standard;
                break;
            case 'Urgent':
                this.severity = 3;
                this.limit = criteria.urgent;
                break;
            case 'VeryUrgent':
                this.severity = 4;
                this.limit = criteria.veryUrgent;
                break;
            case 'Immediate':
                this.severity = 5;
                this.limit = criteria.immediate;
                break;
        }
    }
};

export { NodeConsult, NodeTriage, NodeRecep }