import { RecepQueue, TriageQueue, ConsultQueue } from "../../../models/queue";
import { calledsList } from "./called";

export class PatientCaller {
    static callNextRecep(): string {
        const call = RecepQueue.callNext();

        if (call === 'Fila vazia') {
            return call
        } else {
            return call.ticket!
        }
    };

    static callNextTriage() {
        const call = TriageQueue.callNext();
        return call;
    };

    static callNextConsult() {
        const call = ConsultQueue.callNext();

        if (call == 'Fila vazia') {
            return call
        } else {
            calledsList.insert(call)
            return call
        }
    }
}