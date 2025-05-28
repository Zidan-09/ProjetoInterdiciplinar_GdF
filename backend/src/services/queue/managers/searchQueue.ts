import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/queueUtils/createNode";
import { QueueReturns } from "../../../utils/queueUtils/queueEnuns";

type SearchResult = {
    status: QueueReturns;
    node?: NodeConsult;
}
class SearchQueue {
    static search(id: number): SearchResult {
        let temp: null | NodeConsult = ConsultQueue.getFirst();

        if (!temp) {
            return { status: QueueReturns.EmptyQueue }
        } else {
            while (temp) {
                if (temp.triage.careFlow_id == id) {
                    return { status: QueueReturns.Found, node: temp }
                }
            }

            return { status: QueueReturns.NotFound }
        }
    }
}

export { SearchResult, SearchQueue }