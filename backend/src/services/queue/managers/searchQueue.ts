import { CallsConsult } from "../../../entities/careFlow";
import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/createNode";

enum SearchResultType {
    EmptyQueue = 'empty_queue',
    NotFound = 'not_found',
    Found = 'found'
}

type SearchResult = {
    status: SearchResultType;
    node?: NodeConsult;
}
class SearchQueue {
    static search(id: number): SearchResult {
        let temp: null | NodeConsult = ConsultQueue.getFirst();

        if (!temp) {
            return { status: SearchResultType.EmptyQueue }
        } else {
            while (temp) {
                if (temp.triage.careFlow_id == id) {
                    return { status: SearchResultType.Found, node: temp }
                }
            }

            return { status: SearchResultType.NotFound }
        }
    }
}

export { SearchResultType, SearchResult, SearchQueue }