import { Patient } from "./patient";
import { No } from "../utils/createNo";


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
    triageQueue: Patient[];

    constructor() {
        this.triageQueue = [];
    }
}

class ConsultQueue {
    pointer: undefined | null | No;

    constructor() {
        this.pointer = null;
    }
}

export const AttendQ: AttendQueue = new AttendQueue()
export const TriageQ: TriageQueue = new TriageQueue()
export const ConsultQ: ConsultQueue = new ConsultQueue()