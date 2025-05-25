import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/createNode";

export class PriorityHandler {
    static verify(): string {
        const nodesToSort: NodeConsult[] = [];
        let temp: NodeConsult | null = ConsultQueue.getFirst();

        if (!temp) {
            return 'Fila vazia'

        } else {
            let dateNow: Date = new Date();

            for (let i = 0; i < ConsultQueue.getQty(); i++) {
                if (temp) {
                    let next: NodeConsult | null = temp.pointer;

                    const limit: Date = new Date();
                    limit.setUTCHours(temp.limitDate.limitHours, temp.limitDate.limitMinuts, 0, 0);

                    if (dateNow >= limit) {
                        temp.maxPriority = true;
                        nodesToSort.push(temp);
                    }
                    temp = next;    
                }
            }
            nodesToSort.forEach(node => this.toSort(node));
            
            return 'Fila atualizada';
        }
    };

    static toSort(node: NodeConsult): void {
        if (ConsultQueue.getFirst() != node) {

            let temp: NodeConsult | null = ConsultQueue.getFirst();

            while (temp?.pointer && temp.pointer !== node) {
                temp = temp.pointer;
            }
            
            if (temp?.pointer === node) {
                temp.pointer = node.pointer
            }
        }
        const first = ConsultQueue.getFirst();
        if (!first || !first.maxPriority || first.triageCategory < node.triageCategory) {
            node.pointer = first;
            ConsultQueue.setFirst(node);
            return;
        }

        let current: NodeConsult | null = ConsultQueue.getFirst();
        while (current && current.pointer && current.pointer.maxPriority && current.pointer.triageCategory <= node.triageCategory) {
            current = current.pointer
        }

        if (current) {
            node.pointer = current.pointer;
            current.pointer = node;
        }
    }
}