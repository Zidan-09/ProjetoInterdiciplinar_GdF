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
    triagePointer: undefined | null | NoTriage;

    constructor() {
        this.triagePointer = null;
    }
}

class ConsultQueue {
    consultPointer: undefined | null | NoConsult;

    constructor() {
        this.consultPointer = null;
    }
}

export const AttendQ: AttendQueue = new AttendQueue()
export const TriageQ: TriageQueue = new TriageQueue()
export const ConsultQ: ConsultQueue = new ConsultQueue()