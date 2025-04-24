import { NoAttend } from "../utils/createNoAttend";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";
export type Priority = 'VeryPriority' | 'Priority' | 'NonPriority' 

class AttendQueue {
    firstPointer: undefined | null | NoAttend;
    lastPointer: undefined | null | NoAttend;
    qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }
}

class TriageQueue {
    firstPointer: undefined | null | NoTriage;
    lastPointer: undefined | null | NoTriage;
    qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }
}

class ConsultQueue {
    firstPointer: undefined | null | NoConsult;
    lastPointer: undefined | null | NoConsult;
    qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }
}

export const AttendQ: AttendQueue = new AttendQueue()
export const TriageQ: TriageQueue = new TriageQueue()
export const ConsultQ: ConsultQueue = new ConsultQueue()