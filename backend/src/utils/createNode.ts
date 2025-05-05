import { Patient } from "../models/patient";
import { Triage } from "../models/careFlow";
import { criteria } from "../models/criteria";

export class NodeRecep {
    public ticket: string | undefined;
    priority: number;
    pointer: undefined | NodeRecep;

    constructor(priority: number) {
        this.ticket = undefined;
        this.priority = priority;
        this.pointer = undefined;
    }
};

export class NodeTriage {
    patient: Patient['name'];
    pointer: undefined | NodeTriage;

    constructor(patientName: Patient['name']) {
        this.patient = patientName;
        this.pointer = undefined;
    }
};

export class NodeConsult {
    triage: Triage;
    severity: number | undefined;
    time: Date;
    limit: number;
    pointer: undefined | NodeConsult;

    constructor(patientTriage: Triage) {
        this.triage = patientTriage;
        this.pointer = undefined;
        this.time = new Date();

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