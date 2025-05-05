import { AttendQueue, TriageQueue, ConsultQueue } from "../models/queue";
import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";

export const attendQueue: string[] = [];
export const triageQueue: string[] = [];
export const consultQueue: string[] = [];

export type typeQueue = 'attend' | 'triage' | 'consult'

export class QueueServices {
    static createTicket(priority: number): string {
        const no: NodeRecep = new NodeRecep(priority);

        switch (priority) {
            case 1:
                no.ticket = 'N' + (AttendQueue.qtyN + 1).toString().padStart(3, '0');
                break;
            case 2:
                no.ticket = 'P' + (AttendQueue.qtyP + 1).toString().padStart(3, '0');
                break;
            case 3:
                no.ticket = 'V' + (AttendQueue.qtyV + 1).toString().padStart(3, '0');
                break;
        }
        this.insertAttendQueue(no);
        return no.ticket!;
    };

    static insertAttendQueue(no: NodeRecep) {
        if (AttendQueue.qtyPatients == 0) {
            AttendQueue.firstPointer = no;
            AttendQueue.lastPointer = no;
        } else {
            let temp: NodeRecep = AttendQueue.firstPointer!;
            for (let i = 0; i < AttendQueue.qtyPatients; i++) {
                if (temp.priority! < no.priority!) {
                    no.pointer = temp;
                    AttendQueue.firstPointer = no;
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
                AttendQueue.qtyN++;
                break;
            case 2:
                AttendQueue.qtyP++;
                break;
            case 3:
                AttendQueue.qtyV++;
                break
        }
        AttendQueue.qtyPatients++;
    };

    static insertTriageQueue(no: NodeTriage) {
        if (TriageQueue.qtyPatients == 0) {
            TriageQueue.firstPointer = no;
        } else {
            TriageQueue.lastPointer!.pointer = no;
        }
        TriageQueue.lastPointer = no;
        TriageQueue.qtyPatients++;
    };

    static insertConsultQueue(no: NodeConsult) {
        if (ConsultQueue.qtyPatients == 0) {
            ConsultQueue.firstPointer = no;
            ConsultQueue.lastPointer = no;
        } else {
            let temp: NodeConsult = ConsultQueue.firstPointer!;
            for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                if (temp.severity! < no.severity!) {
                    no.pointer = temp;
                    ConsultQueue.firstPointer = no;
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
        ConsultQueue.qtyPatients++;
    };

    static showQueue(queue: typeQueue): string | string[] {
        switch (queue) {
            case 'attend':
                if (AttendQueue.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempA = AttendQueue.firstPointer;
                    for (let i = 0; i < AttendQueue.qtyPatients; i++) {
                        attendQueue.push(tempA!.ticket!);
                        if (tempA?.pointer == undefined) {
                            break
                        } else {
                            tempA = tempA?.pointer;
                        }
                    }
                    return attendQueue;
                }
            case 'triage':
                if (TriageQueue.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempT = TriageQueue.firstPointer;
                    for (let i = 0; i < TriageQueue.qtyPatients; i++) {
                        triageQueue.push(tempT!.patient);
                        tempT = tempT?.pointer;
                    }
                    return triageQueue;
                }
            case 'consult':
                if (ConsultQueue.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempC = ConsultQueue.firstPointer;
                    for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                        consultQueue.push(tempC!.triage.patient);
                        tempC = tempC?.pointer;
                    }
                    return consultQueue;
                }
        }
    }

    static callNextAttend(): string {
        if (AttendQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = AttendQueue.firstPointer;
            const next = call?.pointer;

            AttendQueue.firstPointer = next;

            AttendQueue.qtyPatients--;
            return `Senha: ${call?.ticket}`
        }
    }
    static callNextTriage(): string {
        if (TriageQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = TriageQueue.firstPointer;
            const next = call?.pointer;

            TriageQueue.firstPointer = next;

            TriageQueue.qtyPatients--;
            return `${call!.patient}, vá para a triagem!`
        }
    }

    static callNextConsult(): string {
        if (ConsultQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = ConsultQueue.firstPointer;
            const next = call?.pointer;

            ConsultQueue.firstPointer = next;

            ConsultQueue.qtyPatients--;
            return `${call?.triage.patient}, vá ao consultório!`
        }
    }

    static search(id: number): NodeConsult {
        return ConsultQueue.firstPointer!;
    }

    static toSort() {
        
    }
}