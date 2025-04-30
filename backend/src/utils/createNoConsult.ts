import { Triage } from "../models/careFlow";

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
            case 'Non-urgent': 
                this.severity = 1;
                this.limit = 240;
                break;
            case 'Low-urgency':
                this.severity = 2;
                this.limit = 120;
                break;
            case 'Urgent':
                this.severity = 3;
                this.limit = 60;
                break;
            case 'Very-urgent':
                this.severity = 4;
                this.limit = 10;
                break;
            case 'Immediate':
                this.severity = 5;
                this.limit = 0;
                break;
        }
    }
}
