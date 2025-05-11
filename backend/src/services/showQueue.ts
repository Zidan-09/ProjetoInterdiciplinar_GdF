import { RecepQueue, TriageQueue, ConsultQueue } from "../models/queue";
import { typeQueue } from "./queueService";

export class ShowQueue {

    static async showQueue(typeOfQueue: typeQueue) {
        let queue: any[] = [];

        switch (typeOfQueue) {
            case 'recep':
                const recepQueue: string | string[] = await this.showRecepQueue(queue);
                return recepQueue;
            case 'triage':
                this.showTriageQueue(queue);
                const triageQueue = await this.showTriageQueue(queue);
                return triageQueue;
            case 'consult':
                const consultQueue = await this.showConsultQueue(queue);
                return consultQueue;
        }
    };

    static async showRecepQueue(queue: any[]): Promise<string | string[]> {
        if (RecepQueue.qtyPatients == 0) {
            return 'Lista vazia!'
        } else {
            let tempA = RecepQueue.firstPointer;
            for (let i = 0; i < RecepQueue.qtyPatients; i++) {
                queue.push(tempA!.ticket!);
                if (tempA?.pointer == null) {
                    break
                } else {
                    tempA = tempA?.pointer;
                }
            }
        }
        return queue;
    };

    static async showTriageQueue(queue: any[]): Promise<string|string[]> {
        if (TriageQueue.qtyPatients == 0) {
            return 'Lista vazia!'
        } else {
            let tempT = TriageQueue.firstPointer;
            for (let i = 0; i < TriageQueue.qtyPatients; i++) {
                queue.push(tempT!.patient_name);
                if (tempT?.pointer == null) {
                    break
                } else {
                    tempT = tempT?.pointer;
                }
            }
        }
        return queue;
    };

    static async showConsultQueue(queue: any[]): Promise<string | string[]> {
        if (ConsultQueue.qtyPatients == 0) {
            return 'Lista vazia!'
        } else {
            let tempC = ConsultQueue.firstPointer;
            for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                queue.push(tempC?.triage.patient_name);
                if (tempC?.pointer == null) {
                    break
                } else {
                    tempC = tempC?.pointer;
                } 
            }
        }
        return queue;
    };
};