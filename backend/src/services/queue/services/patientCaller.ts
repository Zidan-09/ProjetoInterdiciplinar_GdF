import { CallsConsult } from "../../../entities/careFlow";
import { RecepQueue, TriageQueue, ConsultQueue } from "../../../entities/queue";
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

        if (call == 'Fila vazia') {
            return call;
        } else {
            return call.patient_name;
        }
    };

    static callNextConsult() {
        const call = ConsultQueue.callNext();

        if (call == 'Fila vazia') {
            return call
        } else {
            const called: CallsConsult = calledsList.insert(call)
            return called.patient_name;
        }
    }
}