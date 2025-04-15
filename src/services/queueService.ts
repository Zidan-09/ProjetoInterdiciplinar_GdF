import { Patient } from "../models/patient";
import { AttendQ, TriageQ, ConsultQ } from "../models/queue";
import { No } from "../utils/createNo";

export type typeQueue = 'attend' | 'triage' | 'consult'

export class QueueServices {

    insertAttendQueue() {


        // AttendQ.attendQueue.push()
    }

    insertTriageQueue(patient: Patient) {
        TriageQ.triageQueue.push(patient)
    }

    insertConsultQueue(no: No) {
        let temp = ConsultQ;
        let end: Boolean = true;

        while (end) {
            if (temp.pointer == null) {
                temp.pointer = no;
                break
            } else {
                temp = temp.pointer;
            }
        }
    }

    showQueue(queue: typeQueue) {
        switch (queue) {
            case 'attend':
                console.log(AttendQ.attendQueue)
            case 'triage':
                console.log(TriageQ.triageQueue)
            case 'consult':
                let temp = ConsultQ.pointer;
                let end: Boolean = true

                while (end) {
                    end = false;

                    if (temp != null) {
                        console.log(temp);
                        temp = temp?.pointer;
                        end = true;
                    }
                }
        }
    }

    callNextTriage(): Patient {
        console.log(`${TriageQ.triageQueue[0].name}, vá a triagem!`)
        const attend: Patient = TriageQ.triageQueue[0]
        TriageQ.triageQueue.shift()
        return attend;
    }

    callNextConsult() {
        const call = ConsultQ.pointer;
        const next = call?.pointer;

        ConsultQ.pointer = next;

        console.log(`${call?.patient.name}, vá ao consultório!`);
    }

    toSort() {}
}

export const QueueFunctions: QueueServices = new QueueServices();