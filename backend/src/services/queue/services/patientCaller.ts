import { RecepQueue, TriageQueue, ConsultQueue } from "../../../entities/queue";
import { getSocketInstance } from "../../../socket";
import { QueueReturns, TypeQueue } from "../../../utils/queueUtils/queueEnuns";

export class PatientCaller {
    
    static callNext(typeQueue: TypeQueue): string {
        const io = getSocketInstance();

        let call: any;

        switch (typeQueue) {
            case TypeQueue.Recep:
                call = RecepQueue.callNext();
                break;
            case TypeQueue.Triage:
                call = TriageQueue.callNext();
                break;
            case TypeQueue.Consult:
                call = ConsultQueue.callNext();
                break;
        }

        if (call === QueueReturns.EmptyQueue) {
            return call
        } else {
            io.emit("teste", {
                send: call
            })

            if (typeQueue === TypeQueue.Recep) {
                return call.ticket
            } else {
                return call.patient_name
            }
        }
    };
};