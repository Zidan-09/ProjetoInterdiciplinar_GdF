import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/createNode";

enum VerifyResponse {
    EmptyQueue = 'Fila vazia',
    UpdatedQueue = 'Fila atualizada'
}

export class PriorityHandler {
    static verify(): VerifyResponse {
        const nodesToSort: NodeConsult[] = [];

        let temp: NodeConsult | null = ConsultQueue.getFirst();

        if (!temp) {
            return VerifyResponse.EmptyQueue;
        } else {
            const dateNow = new Date();

            for (let i = 0; i < ConsultQueue.getQty(); i++) {
                if (temp && !temp.maxPriority) {
                    const timeElapsedMs = dateNow.getTime() - temp.time.getTime();
                    const timeLimitMs = temp.limitDate * 60 * 1000 * 0.8;

                    if (timeElapsedMs >= timeLimitMs) {
                        temp.maxPriority = true;
                        nodesToSort.push(temp);
                    }

                    temp = temp.pointer;
                }
            }

            nodesToSort.forEach(node => this.toSort(node));

            return VerifyResponse.UpdatedQueue;
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
    };
}