import { RecepQueue } from "../../models/queue";
import { QueueManager } from "../managers/queueManager";
import { NodeRecep } from "../../utils/createNode";

export class CreateTicket {
    static createTicket(priority: number): string {
        const no: NodeRecep = new NodeRecep(priority);

        switch (priority) {
            case 1:
                no.ticket = 'N' + (RecepQueue.qtyN + 1).toString().padStart(3, '0');
                break;
            case 2:
                no.ticket = 'P' + (RecepQueue.qtyP + 1).toString().padStart(3, '0');
                break;
            case 3:
                no.ticket = 'V' + (RecepQueue.qtyV + 1).toString().padStart(3, '0');
                break;
        }
        QueueManager.insertRecepQueue(no);
        return no.ticket!;
    };
}