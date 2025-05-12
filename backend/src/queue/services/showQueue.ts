import { ConsultQueue, RecepQueue, TriageQueue } from "../../models/queue";
import { typeQueue } from "../../services/queueService";

export class ShowQueue {
    static showQueue(queue: typeQueue) {
        let queueList = [];
        switch (queue) {
            case 'recep':
                let tempR = RecepQueue.getFirst();

                for (let i = 0; i < RecepQueue.getQty(); i++) {
                    if (tempR) {
                    queueList.push(tempR);
                    tempR = tempR.pointer
                    }
                }
                break;

            case 'triage':
                let tempT = TriageQueue.getFirst();

                for (let i = 0; i < TriageQueue.getQty(); i++) {
                    if (tempT) {
                    queueList.push(tempT);
                    tempT = tempT.pointer
                    }
                }
                break;
            case 'consult':
                let tempC = ConsultQueue.getFirst();

                for (let i = 0; i < ConsultQueue.getQty(); i++) {
                    if (tempC) {
                    queueList.push(tempC);
                    tempC = tempC.pointer
                    }
                }
                break;
        }
        return queueList;
    }
}