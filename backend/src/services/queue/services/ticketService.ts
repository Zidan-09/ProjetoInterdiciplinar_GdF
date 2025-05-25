import { RecepQueue } from "../../../entities/queue";
import { NodeRecep } from "../../../utils/createNode";
import { InsertQueue } from "./insertQueue";

export class CreateTicket {
    static createTicket(priority: number): string {
        const node: NodeRecep = new NodeRecep(priority);

        switch (priority) {
            case 1:
                node.ticket = 'N' + (RecepQueue.getQtyN() + 1).toString().padStart(3, '0');
                break;
            case 2:
                node.ticket = 'P' + (RecepQueue.getQtyP() + 1).toString().padStart(3, '0');
                break;
            case 3:
                node.ticket = 'V' + (RecepQueue.getQtyV() + 1).toString().padStart(3, '0');
                break;
        }
        InsertQueue.insertRecepQueue(node)
        return node.ticket!;
    };
}