import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";

export type Priority = 'VeryPriority' | 'Priority' | 'Non-Priority' 

class AttendQueueClass {
    firstPointer: undefined | NodeRecep;
    lastPointer: undefined | NodeRecep;
    qtyN: number;
    qtyP: number;
    qtyV: number;
    qtyPatients: number;

    constructor() {
        this.firstPointer = undefined;
        this.lastPointer = undefined;
        this.qtyN = 0;
        this.qtyP = 0;
        this.qtyV = 0;
        this.qtyPatients = 0;
    }
}

class TriageQueueClass {
    firstPointer: undefined | NodeTriage;
    lastPointer: undefined | NodeTriage;
    qtyPatients: number;

    constructor() {
        this.firstPointer = undefined;
        this.lastPointer = undefined;
        this.qtyPatients = 0;
    }
}

class ConsultQueueClass {
    firstPointer: undefined | NodeConsult;
    lastPointer: undefined | NodeConsult;
    qtyPatients: number;

    constructor() {
        this.firstPointer = undefined;
        this.lastPointer = undefined;
        this.qtyPatients = 0;
    }
}

export const AttendQueue: AttendQueueClass = new AttendQueueClass()
export const TriageQueue: TriageQueueClass = new TriageQueueClass()
export const ConsultQueue: ConsultQueueClass = new ConsultQueueClass()