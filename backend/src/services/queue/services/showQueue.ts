import { ConsultQueue, RecepQueue, TriageQueue } from "../../../entities/queue";
import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";


export function showQueue(queue: { typeQueue: TypeQueue }) {
    let queueList = [];

    switch (queue.typeQueue) {
        case TypeQueue.Recep:
            let tempR = RecepQueue.getFirst();

            for (let i = 0; i < RecepQueue.getQty(); i++) {
                if (tempR) {
                queueList.push(tempR.ticket);
                tempR = tempR.pointer
                }
            }
            break;

        case TypeQueue.Triage:
            let tempT = TriageQueue.getFirst();

            for (let i = 0; i < TriageQueue.getQty(); i++) {
                if (tempT) {
                queueList.push(tempT.patient_name);
                tempT = tempT.pointer
                }
            }
            break;
        case TypeQueue.Consult:
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