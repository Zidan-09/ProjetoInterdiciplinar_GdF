import { Patient } from "../models/patient";
import { AttendQ, TriageQ, ConsultQ } from "../models/queue";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";

export type typeQueue = 'attend' | 'triage' | 'consult'

export class QueueServices {

    insertAttendQueue() {


        // AttendQ.attendQueue.push()
    }

    insertTriageQueue(no: NoTriage) {
        let temp1 = TriageQ;
        let temp2 = TriageQ.triagePointer;
        let end: Boolean = true;
        let first: Boolean = true;

        if (first) {
            if (temp1.triagePointer == null) {
                temp1.triagePointer = no;
            } else {
                first = false
            }
        } else {
            while (end) {
                if (temp2!.pointer == null) {
                    temp2!.pointer = no;
                    break
                } else {
                    temp2 = temp2!.pointer;
                }
            }
        }
    }

    insertConsultQueue(no: NoConsult) {
        let temp1 = ConsultQ;
        let temp2 = ConsultQ.consultPointer;
        let end: Boolean = true;
        let first: Boolean = true;

        if (first) {
            if (temp1.consultPointer == null) {
                temp1.consultPointer = no;
            } else {
                first = false
            }
        } else {
            while (end) {
                if (temp2!.pointer == null) {
                    temp2!.pointer = no;
                    break
                } else {
                    temp2 = temp2!.pointer;
                }
            }
        }
    }

    showQueue(queue: typeQueue) {
        let end: boolean = true;
        let temp1;
        let temp2;

        switch (queue) {
            case 'attend':
                console.log(AttendQ.attendQueue)

            case 'triage':
                let temp1 = ConsultQ.consultPointer;

                while (end) {
                    end = false;

                    if (temp1 != null) {
                        console.log(temp1);
                        temp1 = temp1?.pointer;
                        end = true;
                    }
                }

            case 'consult':
                let temp = ConsultQ.consultPointer;

                while (end) {
                    end = false;

                    if (temp2 != null) {
                        console.log(temp2);
                        temp2 = temp2?.pointer;
                        end = true;
                    }
                }
        }
    }

    callNextTriage(): Patient {
        const call = TriageQ.triagePointer;
        const next = call?.pointer;

        TriageQ.triagePointer = next;

        console.log(`${call?.patient.name}, vá para a triagem!`)
        return call?.patient
    }

    callNextConsult() {
        const call = ConsultQ.consultPointer;
        const next = call?.pointer;

        ConsultQ.consultPointer = next;

        console.log(`${call?.patient.name}, vá ao consultório!`);
    }

    toSort() {}
}

export const QueueFunctions: QueueServices = new QueueServices();