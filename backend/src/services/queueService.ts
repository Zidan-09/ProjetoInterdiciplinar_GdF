import { Triage, Consult, Attend } from "../models/careFlow";
import { Patient } from "../models/patient";
import { AttendQ, TriageQ, ConsultQ, Priority } from "../models/queue";
import { NoAttend } from "../utils/createNoAttend";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";

export const attendQueue: string[] = [];
export const triageQueue: string[] = [];
export const consultQueue: string[] = [];

export type typeQueue = 'attend' | 'triage' | 'consult'

export class QueueServices {
    static createTicket(priority: number) {
        const no: NoAttend = new NoAttend(priority);

        switch (priority) {
            case 1:
                no.ticket = 'N' + (AttendQ.qtyN + 1).toString().padStart(3, '0');
                break;
            case 2:
                no.ticket = 'P' + (AttendQ.qtyP + 1).toString().padStart(3, '0');
                break;
            case 3:
                no.ticket = 'V' + (AttendQ.qtyV + 1).toString().padStart(3, '0');
                break;
        }
        this.insertAttendQueue(no);
    }

    static insertAttendQueue(no: NoAttend) {
        if (AttendQ.qtyPatients == 0) {
            AttendQ.firstPointer = no;
            AttendQ.lastPointer = no;
        } else {
            let temp: NoAttend | null | undefined = AttendQ.firstPointer!;
            for (let i = 0; i < AttendQ.qtyPatients; i++) {
                if (temp.priority < no.priority) {
                    no.pointer = temp;
                    AttendQ.firstPointer = no;
                } else if (temp.priority >= no.priority) {
                    if (temp.pointer == null) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else if (temp.pointer!.priority < no.priority) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else {
                        temp = temp?.pointer;
                    }
                }
            }
        }
        

        switch (no.priority) {
            case 1:
                AttendQ.qtyN++;
                break;
            case 2:
                AttendQ.qtyP++;
                break;
            case 3:
                AttendQ.qtyV++;
                break
        }
        AttendQ.qtyPatients++;
    }

    static insertTriageQueue(no: NoTriage) {
        if (TriageQ.qtyPatients == 0) {
            TriageQ.firstPointer = no;
        } else {
            TriageQ.lastPointer!.pointer = no;
        }
        TriageQ.lastPointer = no;
        TriageQ.qtyPatients++;
    }

    static insertConsultQueue(no: NoConsult) {
        if (ConsultQ.qtyPatients == 0) {
            ConsultQ.firstPointer = no;
            ConsultQ.lastPointer = no;
        } else {
            let temp: NoConsult | null | undefined = ConsultQ.firstPointer!;
            for (let i = 0; i < ConsultQ.qtyPatients; i++) {
                if (temp.severity! < no.severity!) {
                    no.pointer = temp;
                    ConsultQ.firstPointer = no;
                } else if (temp.severity! >= no.severity!) {
                    if (temp.pointer == null) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else if (temp.pointer!.severity! < no.severity!) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else {
                        temp = temp?.pointer;
                    }
                }
            }
        }
        ConsultQ.qtyPatients++;
    }

    static showQueue(queue: typeQueue) {
        switch (queue) {
            case 'attend':
                if (AttendQ.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempA = AttendQ.firstPointer;
                    for (let i = 0; i < AttendQ.qtyPatients; i++) {
                        attendQueue.push(tempA!.ticket!);
                        if (tempA?.pointer == null || undefined) {
                            break
                        } else {
                            tempA = tempA?.pointer;
                        }
                    }
                    return attendQueue;
                }
                break;
            case 'triage':
                if (TriageQ.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempT = TriageQ.firstPointer;
                    for (let i = 0; i < TriageQ.qtyPatients; i++) {
                        triageQueue.push(tempT!.patient);
                        tempT = tempT?.pointer;
                    }
                    return triageQueue;
                }
                break;
            case 'consult':
                if (ConsultQ.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempC = ConsultQ.firstPointer;
                    for (let i = 0; i < ConsultQ.qtyPatients; i++) {
                        consultQueue.push(tempC!.triage.patient);
                        tempC = tempC?.pointer;
                    }
                    return consultQueue;
                }
                break;
        }
    }

    static callNextAttend(): string {
        if (AttendQ.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = AttendQ.firstPointer;
            const next = call?.pointer;

            AttendQ.firstPointer = next;

            AttendQ.qtyPatients--;
            return `Senha: ${call?.ticket}`
        }
    }
    static callNextTriage(): string {
        if (TriageQ.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = TriageQ.firstPointer;
            const next = call?.pointer;

            TriageQ.firstPointer = next;

            TriageQ.qtyPatients--;
            return `${call!.patient}, vá para a triagem!`
        }
    }

    static callNextConsult(): string {
        if (ConsultQ.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = ConsultQ.firstPointer;
            const next = call?.pointer;

            ConsultQ.firstPointer = next;

            ConsultQ.qtyPatients--;
            return `${call?.triage}, vá ao consultório!`
        }
    }

    static search(id: number): NoConsult {
        return ConsultQ.firstPointer!;
    }

    static toSort() {
        
    }
}