import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/queueUtils/createNode";
import { QueueResponses } from "../../../utils/queueUtils/queueEnuns";

type SearchResult = {
    status: QueueResponses;
    node?: NodeConsult;
}
class SearchQueue {
    static search(id: number): SearchResult {
        let temp: null | NodeConsult = ConsultQueue.getFirst();

        if (!temp) {
            return { status: QueueResponses.EmptyQueue }
        } else {
            while (temp) {
                if (temp.triage.careFlow_id == id) {
                    return { status: QueueResponses.Found, node: temp }
                }
            }

            return { status: QueueResponses.NotFound }
        }
    }
}

export { SearchResult, SearchQueue }