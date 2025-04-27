import { Attend } from "../careFlow/attend";
import { Triage } from "../careFlow/triage";
import { Patient } from "../models/patient";
import { AttendQ, TriageQ, ConsultQ, Priority } from "../models/queue";
import { NoAttend } from "../utils/createNoAttend";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";

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
                    console.log('Lista vazia!')
                } else {
                    let tempA = AttendQ.firstPointer;
                    for (let i = 0; i < AttendQ.qtyPatients; i++) {
                        console.log(tempA!.ticket);
                        if (tempA?.pointer == null || undefined) {
                            break
                        } else {
                            tempA = tempA?.pointer;
                        }
                    }
                }
                break;
            case 'triage':
                if (TriageQ.qtyPatients == 0) {
                    console.log('Lista vazia!')
                } else {
                    let tempT = TriageQ.firstPointer;
                    for (let i = 0; i < TriageQ.qtyPatients; i++) {
                        console.log(tempT?.attend.patient.name);
                        tempT = tempT?.pointer;
                    }
                }
                break;
            case 'consult':
                if (ConsultQ.qtyPatients == 0) {
                    console.log('Fila vazia!')
                } else {
                    let tempC = ConsultQ.firstPointer;
                    for (let i = 0; i < ConsultQ.qtyPatients; i++) {
                        console.log(tempC?.triage.attend.patient.name, tempC?.severity);
                        tempC = tempC?.pointer;
                    }
                }
                break;
        }
    }

    static callNextAttend(): void {
        if (AttendQ.qtyPatients == 0) {
            console.log('Fila vazia');
        } else {
            const call = AttendQ.firstPointer;
            const next = call?.pointer;

            AttendQ.firstPointer = next;

            console.log(`Senha: ${call?.ticket}`)
            AttendQ.qtyPatients--;
        }
    }
    static callNextTriage(): Attend {
        if (TriageQ.qtyPatients == 0) {
            console.log('Fila vazia');
            return TriageQ.firstPointer?.attend!;
        } else {
            const call = TriageQ.firstPointer;
            const next = call?.pointer;

            TriageQ.firstPointer = next;

            console.log(`${call?.attend.patient.name}, vá para a triagem!`)
            TriageQ.qtyPatients--;
            return call?.attend!
        }
    }

    static callNextConsult(): Triage {
        if (ConsultQ.qtyPatients == 0) {
            console.log('Fila vazia')
            return ConsultQ.firstPointer?.triage!;
        } else {
            const call = ConsultQ.firstPointer;
            const next = call?.pointer;

            ConsultQ.firstPointer = next;

            console.log(`${call?.triage.attend.patient.name}, vá ao consultório!`);
            ConsultQ.qtyPatients--;
            return call!.triage;
        }
    }

    static search(patientId: Patient['id']): NoConsult | undefined | null {
        let find: Boolean = false;
        let temp = ConsultQ.firstPointer;

        for (let i = 0; i < ConsultQ.qtyPatients; i++) {
            if (temp!.triage.attend.patient.id === patientId) {
                console.log('Paciente:', temp!.triage.attend.patient.name);
                find = true;
                return temp!;
            } else {
                temp = temp?.pointer;
            }
        }

        if (!find) {
            console.log('Paciente não encontrado.');
            return temp;
        }
    }

    static toSort() {
        
    }
}