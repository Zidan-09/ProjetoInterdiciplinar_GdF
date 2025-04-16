import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";


class AttendQueue {
    veryPriorityQueue: number[];
    priorityQueue: number[];
    defaultQueue: number[];

    attendQueue: [number[], number[], number[]];

    constructor() {
        this.veryPriorityQueue = [];
        this.priorityQueue = [];
        this.defaultQueue = [];
        
        this.attendQueue = [this.veryPriorityQueue, this.priorityQueue, this.defaultQueue];
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