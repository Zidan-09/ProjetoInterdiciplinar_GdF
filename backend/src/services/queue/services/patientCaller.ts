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
                io.emit(TypeQueue.Recep, {
                    called: call.ticket,
                    queue: TypeQueue.Recep
                })
                break;

            case TypeQueue.Triage:
                call = TriageQueue.callNext();
                io.emit(TypeQueue.Triage, {
                    called: call.patient_name,
                    queue: TypeQueue.Triage
                })
                break;

            case TypeQueue.Consult:
                call = ConsultQueue.callNext();
                io.emit(TypeQueue.Consult, {
                    called: call.patient_id,
                    queue: TypeQueue.Consult
                })
                break;
        }

        if (call === QueueReturns.EmptyQueue) {
            return call
        } else {
            if (typeQueue === TypeQueue.Recep) {
                return call.ticket
            } else {
                return call.patient_name
            }
        }
    };
};