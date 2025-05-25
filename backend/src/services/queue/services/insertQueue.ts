import { ConsultQueue, RecepQueue, TriageQueue } from "../../../entities/queue";
import { NodeRecep, NodeTriage, NodeConsult } from "../../../utils/createNode";

export class InsertQueue {
    static insertRecepQueue(node: NodeRecep) {
        RecepQueue.insertQueue(node);
    }

    static insertTriageQueue(node: NodeTriage) {
        TriageQueue.insertQueue(node);
    }

    static insertConsultQueue(node: NodeConsult) {
        ConsultQueue.insertQueue(node);
    }
}