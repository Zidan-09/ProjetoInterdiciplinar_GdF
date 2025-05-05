import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";

export type Priority = 'VeryPriority' | 'Priority' | 'Non-Priority' 

class RecepQueueClass {
    firstPointer: null | NodeRecep;
    lastPointer: null | NodeRecep;
    qtyN: number;
    qtyP: number;
    qtyV: number;
    qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyN = 0;
        this.qtyP = 0;
        this.qtyV = 0;
        this.qtyPatients = 0;
    }
}

class TriageQueueClass {
    firstPointer: null | NodeTriage;
    lastPointer: null | NodeTriage;
    qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }
}

class ConsultQueueClass {
    firstPointer: null | NodeConsult;
    lastPointer: null | NodeConsult;
    qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }
}

export const RecepQueue: RecepQueueClass = new RecepQueueClass()
export const TriageQueue: TriageQueueClass = new TriageQueueClass()
export const ConsultQueue: ConsultQueueClass = new ConsultQueueClass()