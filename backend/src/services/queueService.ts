import { RecepQueue, TriageQueue, ConsultQueue } from "../models/queue";
import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";

export type typeQueue = 'recep' | 'triage' | 'consult'

export class QueueServices {
    static createTicket(priority: number): string {
        const no: NodeRecep = new NodeRecep(priority);

        switch (priority) {
            case 1:
                no.ticket = 'N' + (RecepQueue.qtyN + 1).toString().padStart(3, '0');
                break;
            case 2:
                no.ticket = 'P' + (RecepQueue.qtyP + 1).toString().padStart(3, '0');
                break;
            case 3:
                no.ticket = 'V' + (RecepQueue.qtyV + 1).toString().padStart(3, '0');
                break;
        }
        this.insertRecepQueue(no);
        return no.ticket!;
    };

    static insertRecepQueue(no: NodeRecep) {
        if (RecepQueue.qtyPatients == 0) {
            RecepQueue.firstPointer = no;
            RecepQueue.lastPointer = no;
        } else {
            let temp: NodeRecep = RecepQueue.firstPointer!;
            for (let i = 0; i < RecepQueue.qtyPatients; i++) {
                if (temp.priority! < no.priority!) {
                    no.pointer = temp;
                    RecepQueue.firstPointer = no;
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
                RecepQueue.qtyN++;
                break;
            case 2:
                RecepQueue.qtyP++;
                break;
            case 3:
                RecepQueue.qtyV++;
                break
        }
        RecepQueue.qtyPatients++;
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
        let queueList = [];

        switch (queue) {
            case 'recep':
                if (RecepQueue.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempA = RecepQueue.firstPointer;
                    for (let i = 0; i < RecepQueue.qtyPatients; i++) {
                        queueList.push(tempA!.ticket!);
                        if (tempA?.pointer == null) {
                            break
                        } else {
                            tempA = tempA?.pointer;
                        }
                    }
                }
                break;

            case 'triage':
                if (TriageQueue.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempT = TriageQueue.firstPointer;
                    for (let i = 0; i < TriageQueue.qtyPatients; i++) {
                        queueList.push(tempT!.patient);
                        if (tempT?.pointer == null) {
                            break
                        } else {
                            tempT = tempT?.pointer;
                        }
                    }
                }
                break;

            case 'consult':
                if (ConsultQueue.qtyPatients == 0) {
                    return 'Lista vazia!'
                } else {
                    let tempC = ConsultQueue.firstPointer;
                    for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                        queueList.push('BOTAR NOME DO PACIENTE DE ALGUM JEITO'); // BOTAR NOME DO PACIENTE DE ALGUM JEITO
                        if (tempC?.pointer == null) {
                            break
                        } else {
                            tempC = tempC?.pointer;
                        } 
                    }
                }
                break;
        }
        return queueList;
    }

    static callNextAttend(): string {
        if (RecepQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = RecepQueue.firstPointer;
            const next = call?.pointer ?? null;

            RecepQueue.firstPointer = next;

            RecepQueue.qtyPatients--;
            return `Senha: ${call?.ticket}`
        }
    }
    static callNextTriage(): string {
        if (TriageQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = TriageQueue.firstPointer;
            const next = call?.pointer ?? null;

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

            ConsultQueue.firstPointer = next ?? null;

            ConsultQueue.qtyPatients--;
            return `${call}, vá ao consultório!`
        }
    }

    static search(id: number): NodeConsult {
        return ConsultQueue.firstPointer!;
    }

    static toSort() {
        
    }
}