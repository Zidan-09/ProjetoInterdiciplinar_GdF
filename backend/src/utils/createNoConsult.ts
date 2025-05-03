import { Triage } from "../models/careFlow";
import { criteria } from "../models/criteria";

export class NoConsult {
    triage: Triage;
    severity: number | undefined;
    time: Date;
    limit: number;
    pointer: null | NoConsult;

    constructor(patientTriage: Triage) {
        this.triage = patientTriage;
        this.pointer = null;
        this.time = new Date();

        switch (patientTriage.severity!) {
            case 'NonUrgent': 
                this.severity = 1;
                this.limit = criteria.nonUrgent;
                break;
            case 'LowUrgency':
                this.severity = 2;
                this.limit = criteria.lowUrgency;
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
}
