import { ConsultQueue, RecepQueue, TriageQueue } from "../../models/queue";
import { typeQueue } from "../../models/queue";

export class ShowQueue {
    static showQueue(queue: typeQueue) {
        let queueList = [];
        switch (queue) {
            case 'recep':
                let tempR = RecepQueue.getFirst();

                for (let i = 0; i < RecepQueue.getQty(); i++) {
                    if (tempR) {
                    queueList.push(tempR.ticket);
                    tempR = tempR.pointer
                    }
                }
                break;

            case 'triage':
                let tempT = TriageQueue.getFirst();

                for (let i = 0; i < TriageQueue.getQty(); i++) {
                    if (tempT) {
                    queueList.push(tempT.patient_name);
                    tempT = tempT.pointer
                    }
                }
                break;
            case 'consult':
                let tempC = ConsultQueue.getFirst();

                for (let i = 0; i < ConsultQueue.getQty(); i++) {
                    if (tempC) {
                    queueList.push(tempC.patient_name);
                    tempC = tempC.pointer
                    }
                }
                break;
        }
        return queueList;
    }
}