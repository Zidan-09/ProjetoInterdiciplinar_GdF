import { RecepQueue, TriageQueue, ConsultQueue } from "../../../entities/queue";
import { getSocketInstance } from "../../../socket";
import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";
import { calls } from "./called";
import { QueueResponses } from "../../../utils/enuns/allResponses";
import { CallTriage, CallConsult } from "../../../entities/careFlow";
import { NodeConsult, NodeTriage } from "../../../utils/queueUtils/createNode";

export function callNext(typeQueue: TypeQueue): Promise<string|CallTriage|CallConsult> {
    const io = getSocketInstance();

    let call: string | CallTriage | CallConsult;
    let temp: any;
    
    switch (typeQueue) {
        case TypeQueue.Recep:
            temp = RecepQueue.callNext();
            if (temp != QueueResponses.EmptyQueue) {
                io.emit(TypeQueue.Recep, {
                    called: temp.ticket,
                    queue: TypeQueue.Recep
                })
                call = temp.ticket;
                return Promise.resolve(call);
            }
            return Promise.resolve(temp);

        case TypeQueue.Triage:
            temp = TriageQueue.callNext();
            if (temp != QueueResponses.EmptyQueue) {
                io.emit(TypeQueue.Triage, {
                    called: temp.patient_name,
                    queue: TypeQueue.Triage
                })

                call = {
                    careFlow_id: temp.careFlow_id,
                    patient_name: temp.patient_name
                }

                return Promise.resolve(call);
            }
            return temp;

        case TypeQueue.Consult:
            temp = ConsultQueue.callNext();
            if (temp != QueueResponses.EmptyQueue) {
                io.emit(TypeQueue.Consult, {
                    called: temp.patient_id,
                    queue: TypeQueue.Consult
                })

                calls(temp);

                call = {
                    careFlow_id: temp.careFlow_id,
                    patient_name: temp.patient_name,
                    triage: temp.triage
                }

                return Promise.resolve(call);
            }
            return temp;
    }
}