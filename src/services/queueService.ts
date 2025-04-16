import { Patient } from "../models/patient";
import { AttendQ, TriageQ, ConsultQ, Priority } from "../models/queue";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";

export type typeQueue = 'attend' | 'triage' | 'consult'

export class QueueServices {

    static insertAttendQueue(priority: Priority) {
        switch (priority) {
            case 'NonPriority':
                AttendQ.qtyPatientsNonPriority++;
                AttendQ.nonPriorityQueue.push(AttendQ.qtyPatientsNonPriority);
                break;
            case 'Priority':
                AttendQ.qtyPatientesPriority++;
                AttendQ.priorityQueue.push(AttendQ.qtyPatientesPriority);
                break;
            case 'VeryPriority':
                AttendQ.qtyPatientsVeryPriority++;
                AttendQ.veryPriorityQueue.push(AttendQ.qtyPatientsVeryPriority);
                break;
        }
        AttendQ.qtyPatients++;
    }

    static insertTriageQueue(no: NoTriage) {
        if (TriageQ.firstPointer == null) {
            TriageQ.firstPointer = no;
        } else {
            TriageQ.lastPointer!.pointer = no;
        }
        TriageQ.lastPointer = no;
        TriageQ.qtyPatients++;
    }

    static insertConsultQueue(no: NoConsult) {
        if (ConsultQ.firstPointer == null) {
            ConsultQ.firstPointer = no;
            ConsultQ.lastPointer = no;
        } else {
            ConsultQ.lastPointer!.pointer = no;
        }
        ConsultQ.lastPointer = no;
        ConsultQ.qtyPatients++;
    }

    static showQueue(queue: typeQueue) {
        switch (queue) {
            case 'attend':
                console.log(`Muita Prioridade: ${AttendQ.veryPriorityQueue}`)
                console.log(`Prioridade: ${AttendQ.priorityQueue}`)
                console.log(`Padrão: ${AttendQ.nonPriorityQueue}`)

            case 'triage':
                let tempT = TriageQ.firstPointer;
                for (let i = 0; i < TriageQ.qtyPatients; i++) {
                    console.log(tempT?.patient);
                    tempT = tempT?.pointer;
                }

            case 'consult':
                let tempC = ConsultQ.firstPointer;
                for (let i = 0; i < ConsultQ.qtyPatients; i++) {
                    console.log(tempC?.patient);
                    tempC = tempC?.pointer;
                }
                break;
        }
    }

    static callNextAttend(): void {
        let call: Boolean = false;
        let index: number = -1;
        for (let i of AttendQ.attendQueue) {
            index++;
            for (let o of i) {
                console.log('Senha:', o);
                AttendQ.attendQueue[index].shift()
                call = true;
                break;
            }
            if (call) {
                break;
            }
        }
    }
    static callNextTriage(): Patient {
        const call = TriageQ.firstPointer;
        const next = call?.pointer;

        TriageQ.firstPointer = next;

        console.log(`${call?.patient.name}, vá para a triagem!`)
        return (call?.patient!)
    }

    static callNextConsult() {
        const call = ConsultQ.firstPointer;
        const next = call?.pointer;

        ConsultQ.firstPointer = next;

        console.log(`${call?.patient.name}, vá ao consultório!`);
    }

    toSort() {}
}