import { NodeConsult, NodeRecep, NodeTriage } from "../../utils/createNode";
import { RecepQueue, TriageQueue, ConsultQueue } from "../../models/queue";

export class QueueManager {
    static insertRecepQueue(no: NodeRecep) {
        if (RecepQueue.qtyPatients == 0) {
            RecepQueue.firstPointer = no;
            RecepQueue.lastPointer = no;
        } else {
            let temp: NodeRecep = RecepQueue.firstPointer!;
            for (let i = 0; i < RecepQueue.qtyPatients; i++) {
                if (temp.priority! < no.priority!) {
                    no.pointer = temp;
                    RecepQueue.firstPointer = no;
                } else if (temp.priority >= no.priority) {
                    if (temp.pointer == null) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else if (temp.pointer!.priority < no.priority) {
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
    };

    static insertTriageQueue(no: NodeTriage) {
        if (TriageQueue.qtyPatients == 0) {
            TriageQueue.firstPointer = no;
        } else {
            TriageQueue.lastPointer!.pointer = no;
        }
        TriageQueue.lastPointer = no;
        TriageQueue.qtyPatients++;
    };

    static insertConsultQueue(no: NodeConsult) {
        if (ConsultQueue.qtyPatients == 0) {
            ConsultQueue.firstPointer = no;
            ConsultQueue.lastPointer = no;
        } else {
            let temp: NodeConsult = ConsultQueue.firstPointer!;
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
}