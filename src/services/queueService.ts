import { Patient } from "../models/patient";
import { AttendQ, TriageQ, ConsultQ, Priority } from "../models/queue";
import { NoAttend } from "../utils/createNoAttend";
import { NoConsult } from "../utils/createNoConsult";
import { NoTriage } from "../utils/createNoTriage";

export type typeQueue = 'attend' | 'triage' | 'consult'

export class QueueServices {
    static createTicket(priority: number) {
        const no: NoAttend = new NoAttend(priority);
        
        if (AttendQ.lastPointer == null || undefined) {
            switch (priority) {
                case 1:
                    no.ticket = 'N001';
                    break;
                case 2:
                    no.ticket = 'P001';
                    break;
                case 3:
                    no.ticket = 'V001';
                    break;
            }
        } else if (priority === 1 && AttendQ.lastPointer != null || undefined) {
            no.ticket = 'N' + (parseInt(AttendQ.lastPointer!.ticket!.slice(1)) + 1).toString().padStart(3, '0');
        } else {
            let find: Boolean = false;
            let temp: NoAttend = AttendQ.firstPointer!;
            while (!find) {
                find = true;

                for (let i = 0; i < AttendQ.qtyPatients; i++) {
                    switch (priority) {
                        case 2:
                            if (temp.priority < 2 && (temp.pointer === null || temp.pointer === undefined)) {
                                no.ticket = 'P001';
                            } else if (temp.priority === 2 && (temp.pointer == null || temp.pointer == undefined)) {
                                no.ticket = 'P' + (parseInt(temp.ticket!.slice(1)) + 1).toString().padStart(3, '0');
                            } else {
                                temp = temp.pointer!;
                            }
                            break;
                    }                    
                    switch (priority) {
                        case 3:
                            if (temp.priority < 3 && (temp.pointer === null || temp.pointer === undefined)) {
                                no.ticket = 'V001';
                            } else if (temp.priority === 3 && (temp.pointer == null || temp.pointer == undefined)) {
                                no.ticket = 'V' + (parseInt(temp.ticket!.slice(1)) + 1).toString().padStart(3, '0');
                            } else {
                                temp = temp.pointer!;
                            }
                            break;                    
                    }
                }
            }
        }
        this.insertAttendQueue(no);
    }

    static insertAttendQueue(no: NoAttend) {

        if (AttendQ.firstPointer == null) {
            AttendQ.firstPointer = no;
        } else {
            AttendQ.lastPointer!.pointer = no;
        }
        AttendQ.lastPointer = no;
        AttendQ.qtyPatients++;

        QueueServices.toSortAttend();
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

    static toSortAttend() {
        
    }
}