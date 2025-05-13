import { ConsultQueue } from "../../../models/queue";
import { NodeConsult } from "../../../utils/createNode";

export class PriorityHandler {
    static verify(): string {
        let temp: NodeConsult | null = ConsultQueue.getFirst();

        if (!temp) {
            return 'Fila vazia'

        } else {
            let dateNow: Date = new Date();

            for (let i = 0; i < ConsultQueue.getQty(); i++) {
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
        if (ConsultQueue.getFirst() != no) {

            let temp: NodeConsult | null = ConsultQueue.getFirst();

            while (temp?.pointer && temp.pointer !== no) {
                temp = temp.pointer;
            }
            
            if (temp?.pointer === no) {
                temp.pointer = no.pointer
            }
        }
        const first = ConsultQueue.getFirst();
        if (!first || !first.maxPriority || first.triageCategory < no.triageCategory) {
            no.pointer = first;
            ConsultQueue.setFirst(no);
            return;
        }

        let current: NodeConsult | null = ConsultQueue.getFirst();
        while (current && current.pointer && current.pointer.maxPriority && current.pointer.triageCategory <= no.triageCategory) {
            current = current.pointer
        }

        if (current) {
            no.pointer = current.pointer;
            current.pointer = no;
        }
    }
}