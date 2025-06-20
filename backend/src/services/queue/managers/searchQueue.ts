import { ConsultQueue } from "../../../entities/queue";
import { NodeConsult } from "../../../utils/queueUtils/createNode";
import { QueueResponses } from "../../../utils/enuns/allResponses";

type SearchResult = {
    status: QueueResponses;
    node?: NodeConsult;
}

function searchQueue(patientName: string): SearchResult {
    let temp: null | NodeConsult = ConsultQueue.getFirst();

    if (!temp) {
        return { status: QueueResponses.EmptyQueue }
    } else {
        while (temp) {
            if (temp.patient_name == patientName) {
                return { status: QueueResponses.Found, node: temp }
            }
        }

        return { status: QueueResponses.NotFound }
    }
}

export { SearchResult, searchQueue }