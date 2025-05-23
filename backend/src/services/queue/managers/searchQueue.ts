import { ConsultQueue } from "../../../models/queue";
import { NodeConsult } from "../../../utils/createNode";

export class SearchQueue {
    static search(id: number): string | NodeConsult {
        let temp: null | NodeConsult = ConsultQueue.getFirst();

        if (temp) {
            while(temp) {
                if (temp.triage.careFlow_id === id) {
                    return temp
                } else {
                    temp = temp.pointer
                }
            }
            return 'Paciente não encontrado na fila'
        } else {
            return 'Fila vazia'
        }
    }
}