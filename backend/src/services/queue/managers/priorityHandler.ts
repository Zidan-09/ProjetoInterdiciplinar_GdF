import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/queueUtils/createNode";

enum VerifyResponse {
    UpdatedQueue = 'updated_queue'
}

export const PriorityHandler = {
    verify(): VerifyResponse | undefined {
        const nodesToSort: NodeConsult[] = [];

        let temp: NodeConsult | null = ConsultQueue.getFirst();

        if (!temp) {
            return undefined;

        } else {
            const dateNow = new Date();

            for (let i = 0; i < ConsultQueue.getQty(); i++) {
                if (temp && !temp.maxPriority) {
                    const totalWaitMs = temp.limitDate.getTime() - temp.time.getTime();
                    const elapsedMs = dateNow.getTime() - temp.time.getTime();

                    if (elapsedMs >= totalWaitMs * 0.8) {
                        temp.maxPriority = true;
                        nodesToSort.push(temp);
                    }

                    temp = temp.pointer;
                }
            }

            nodesToSort.forEach(node => this.toSort(node));

            return VerifyResponse.UpdatedQueue;
        }
    },

    toSort(node: NodeConsult): void {
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