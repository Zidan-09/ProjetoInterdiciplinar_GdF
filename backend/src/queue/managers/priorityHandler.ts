import { ConsultQueue } from "../../models/queue";
import { NodeConsult } from "../../utils/createNode";

export class PriorityHandler {
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