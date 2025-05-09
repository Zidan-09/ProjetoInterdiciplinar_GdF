import { Patient } from "../models/patient";
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
                if (temp.triageCategory! < no.triageCategory!) {
                    if (!temp.maxPriority) {
                        no.pointer = temp;
                        ConsultQueue.firstPointer = no;
                    }
                } else if (temp.triageCategory! >= no.triageCategory!) {
                    if (temp.pointer == null) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else if (temp.pointer!.triageCategory! < no.triageCategory!) {
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

    static showQueue(queue: typeQueue): string | Patient[] | string[] {
        let queueList: any[] = [];

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
                        queueList.push(tempC?.triage.patient.name);
                        if (tempC?.pointer == null) {
                            break
                        } else {
                            tempC = tempC?.pointer;
                        } 
                    }
                }
                break;
        }
        console.log(queueList)
        return queueList;
    };

    static callNextRecep(): string {
        if (RecepQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = RecepQueue.firstPointer;
            const next = call?.pointer ?? null;

            RecepQueue.firstPointer = next;

            RecepQueue.qtyPatients--;
            return `Senha: ${call?.ticket}`
        }
    };

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
    };

    static callNextConsult(): string {
        if (ConsultQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = ConsultQueue.firstPointer;
            const next = call?.pointer;

            ConsultQueue.firstPointer = next ?? null;

            ConsultQueue.qtyPatients--;
            return `${call?.triage.patient.name}, vá ao consultório!`
        }
    };

    static search(id: number): NodeConsult {
        return ConsultQueue.firstPointer!;
    };

    static verify(): string {
        let temp: NodeConsult | null = ConsultQueue.firstPointer;

        if (!temp) {
            return 'Fila vazia'

        } else {
            let dateNow: Date = new Date();

            for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                let next: NodeConsult | null = temp!.pointer

                const limit: Date = new Date()
                limit.setUTCHours(temp!.limitDate.limitHours, temp!.limitDate.limitMinuts, 0, 0);

                if (dateNow >= limit) {
                    temp!.maxPriority = true;
                    this.toSort(temp!);
                }

                temp = next;
            }
            return 'Fila atualizada'
        }
    };

    static toSort(no: NodeConsult): void {
        if (ConsultQueue.firstPointer === no) {
            ConsultQueue.firstPointer = no.pointer;
        } else {
            let temp: NodeConsult | null = ConsultQueue.firstPointer;

            while (temp?.pointer && temp.pointer !== no) {
                temp = temp.pointer;
            }
            
            if (temp?.pointer === no) {
                temp.pointer = no.pointer
            }
        }

        if (!ConsultQueue.firstPointer || !ConsultQueue.firstPointer.maxPriority || ConsultQueue.firstPointer.triageCategory < no.triageCategory) {
            no.pointer = ConsultQueue.firstPointer;
            ConsultQueue.firstPointer = no;
            return;
        }

        let current: NodeConsult | null = ConsultQueue.firstPointer;
        while (current.pointer && current.pointer.maxPriority && current.pointer.triageCategory <= no.triageCategory) {
            current = current?.pointer
        }

        no.pointer = current.pointer;
        current.pointer = no;
    }
}

// Algorítimo:
// verifica se a fila está vazia, se sim = 'Fila vazia', se não:
// registrar hora atual
// percorrer a fila com o temp
// se temp.limit <= atual = temp.maxPriority = true, se não = passa pra frente