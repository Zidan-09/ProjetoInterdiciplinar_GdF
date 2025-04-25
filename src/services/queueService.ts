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
                let tempA = AttendQ.firstPointer;
                for (let i = 0; i < AttendQ.qtyPatients; i++) {
                    console.log(tempA!.ticket);
                    if (tempA?.pointer == null || undefined) {
                        break
                    } else {
                        tempA = tempA?.pointer;
                    }
                }

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
        const call = AttendQ.firstPointer;
        const next = call?.pointer;

        AttendQ.firstPointer = next;

        console.log(`Senha: ${call?.ticket}`)
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

    static search(patientCPF: Patient['cpf']): NoConsult | undefined | null {
        let find: Boolean = false;
        let temp = ConsultQ.firstPointer;

        for (let i = 0; i < ConsultQ.qtyPatients; i++) {
            if (temp!.patient.cpf === patientCPF) {
                console.log('Paciente:', temp!.patient.name);
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
}