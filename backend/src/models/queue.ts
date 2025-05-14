import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";

export type Priority = 'VeryPriority' | 'Priority' | 'Non-Priority'
export type typeQueue = 'recep' | 'triage' | 'consult'

abstract class Queue<T extends { pointer: T | null }> {
    protected firstPointer: T | null;
    protected lastPointer:  T | null;
    protected qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }

    public callNext(): T | 'Fila vazia' {
        const call = this.firstPointer;

        if (call) {
            const next = call.pointer
            this.firstPointer = next;
            this.qtyPatients--;
            return call
        } else {
            return 'Fila vazia'
        }
    }

    public getFirst(): T | null {
        return this.firstPointer;
    }

    public setFirst(newFirst: T): void {
        this.firstPointer = newFirst
    }

    public getQty(): number {
        return this.qtyPatients;
    }
};

class RecepQueueClass extends Queue<NodeRecep> {
    private qtyN: number;
    private qtyP: number;
    private qtyV: number;

    constructor() {
        super();
        this.qtyN = 0;
        this.qtyP = 0;
        this.qtyV = 0;
    }

    public insertQueue(no: NodeRecep) {
        if (RecepQueue.qtyPatients === 0) {
            RecepQueue.firstPointer = no;
            RecepQueue.lastPointer = no;

        } else {
            let temp: NodeRecep = RecepQueue.firstPointer as NodeRecep;
            for (let i = 0; i < RecepQueue.qtyPatients; i++) {
                if (temp.priority! < no.priority!) {
                    no.pointer = temp;
                    RecepQueue.firstPointer = no;
                } else if (temp.priority >= no.priority) {
                    if (temp.pointer == null || temp.pointer!.priority < no.priority) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else {
                        temp = temp?.pointer;
                    }
                }
            }
        }
                
        switch (no.priority) {
            case 1:
                RecepQueue.qtyN++;
                break;
            case 2:
                RecepQueue.qtyP++;
                break;
            case 3:
                RecepQueue.qtyV++;
                break
        }
    RecepQueue.qtyPatients++;
    }

    public getQtyN() {
        return this.qtyN;
    }

    public getQtyP() {
        return this.qtyP;
    }

    public getQtyV() {
        return this.qtyV;
    }
};

class TriageQueueClass extends Queue<NodeTriage> {
    constructor() {
        super();
    }

    insertQueue(no: NodeTriage) {
        if (TriageQueue.qtyPatients == 0) {
            TriageQueue.firstPointer = no;
        } else {
            TriageQueue.lastPointer!.pointer = no;
        }
        TriageQueue.lastPointer = no;
        TriageQueue.qtyPatients++;
    }
};

class ConsultQueueClass extends Queue<NodeConsult> {
    constructor() {
        super();
    }

    public insertConsultQueue(no: NodeConsult) {
        if (ConsultQueue.qtyPatients == 0) {
            ConsultQueue.firstPointer = no;
            ConsultQueue.lastPointer = no;
        } else {
            let temp: NodeConsult = ConsultQueue.firstPointer as NodeConsult;
            for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                if (temp.triageCategory! < no.triageCategory!) {
                    if (!temp.maxPriority) {
                        no.pointer = temp;
                        ConsultQueue.firstPointer = no;
                    }
                } else if (temp.triageCategory! >= no.triageCategory!) {
                    if (temp.pointer == null) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else if (temp.pointer!.triageCategory! < no.triageCategory!) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else {
                        temp = temp?.pointer;
                    }
                }
            }
        }
        ConsultQueue.qtyPatients++;
    };
};

export const RecepQueue: RecepQueueClass = new RecepQueueClass()
export const TriageQueue: TriageQueueClass = new TriageQueueClass()
export const ConsultQueue: ConsultQueueClass = new ConsultQueueClass()