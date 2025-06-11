import { RecepQueue, TriageQueue, ConsultQueue } from "../../../entities/queue";
import { getSocketInstance } from "../../../socket";
import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";
import { calls } from "./called";
import { QueueResponses } from "../../../utils/enuns/allResponses";

export class PatientCaller {
    static callNext(typeQueue: TypeQueue) {
        const io = getSocketInstance();

        let call: any;

        switch (typeQueue) {
            case TypeQueue.Recep:
                call = RecepQueue.callNext();
                if (call != QueueResponses.EmptyQueue) {
                    io.emit(TypeQueue.Recep, {
                        called: call.ticket,
                        queue: TypeQueue.Recep
                    })
                    return call.ticket
                }
                break;

            case TypeQueue.Triage:
                call = TriageQueue.callNext();
                if (call != QueueResponses.EmptyQueue) {
                    io.emit(TypeQueue.Triage, {
                        called: call.patient_name,
                        queue: TypeQueue.Triage
                    })
                    return call.patient_name
                }
                break;

            case TypeQueue.Consult:
                call = ConsultQueue.callNext();
                if (call != QueueResponses.EmptyQueue) {
                    io.emit(TypeQueue.Consult, {
                        called: call.patient_id,
                        queue: TypeQueue.Consult
                    })
                    calls(call);

                    return call
                }
                break;
        }

        return call
    };
};