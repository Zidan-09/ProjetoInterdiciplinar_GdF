import { RecepQueue, TriageQueue, ConsultQueue } from "../../models/queue";

export class PatientCaller {
    static callNextRecep() {
        const call = RecepQueue.callNext();

        if (typeof call == 'string') {
            return call
        } else {
            return call.ticket
        }
    };

    static callNextTriage() {
        const call = TriageQueue.callNext();
        return call;
    };

    static callNextConsult() {
        const call = ConsultQueue.callNext();
        return call
    }
}