import { db } from "../db";
import { CallsConsult, Triage } from "../models/careFlow";
import { Patient } from "../models/patient";
import { RecepQueue, TriageQueue, ConsultQueue } from "../models/queue";
import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";

export let lastCalled: CallsConsult | null = null;

export type typeQueue = 'recep' | 'triage' | 'consult'

export class QueueServices {

    static async showQueue(queue: typeQueue): Promise<string|string[]|Patient[]> {
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
                        queueList.push(tempT!.patient_name);
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
                        queueList.push(tempC?.triage.patient_id);
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


    static callCalled(patient_id: number): CallsConsult {
        const [rows]: any = db.query('SELECT name FROM Patients WHERE id = ?', [patient_id]);

        const call: CallsConsult = {
            patient_id: patient_id,
            patient_name: rows[0].name,
            calls: 1
        }
        lastCalled = call;
        return call
    };

    static testCalled(): string {
        lastCalled!.calls++;
        if (lastCalled!.calls === 3) {
            lastCalled = null;
            return 'Não compareceu, chame próximo'
        } else {
            return lastCalled!.patient_name;
        }
    }

    static search(id: number): NodeConsult {
        return ConsultQueue.firstPointer!;
    };
}