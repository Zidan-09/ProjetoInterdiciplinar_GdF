import { RecepQueue } from "../../models/queue";
import { NodeRecep } from "../../utils/createNode";

export class CreateTicket {
    static createTicket(priority: number): string {
        const no: NodeRecep = new NodeRecep(priority);

        switch (priority) {
            case 1:
                no.ticket = 'N' + (RecepQueue.getQtyN() + 1).toString().padStart(3, '0');
                break;
            case 2:
                no.ticket = 'P' + (RecepQueue.getQtyP() + 1).toString().padStart(3, '0');
                break;
            case 3:
                no.ticket = 'V' + (RecepQueue.getQtyV() + 1).toString().padStart(3, '0');
                break;
        }
        RecepQueue.insertQueue(no);
        return no.ticket!;
    };
}