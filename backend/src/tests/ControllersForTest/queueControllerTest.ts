import { TypeQueue } from "../../utils/queueUtils/queueEnuns";
import { showQueue } from "../../services/queue/services/showQueue";
import { callNext } from "../../services/queue/services/patientCaller";
import { HandleResponseTest } from "./handleResponseTest";
import { QueueResponses } from "../../utils/enuns/allResponses";

type Params = { typeQueue: TypeQueue };

export const QueueControllerTest = {
    async queue(request: Params) {
        const queue: Params = request;
        console.log(queue);

        try {
            const queueT = showQueue(queue);

            if (queueT) {
                HandleResponseTest(true, 200, queue.typeQueue, queueT);
            } else {
                HandleResponseTest(false, 400, 'Sla, deu pau aki', null);
            }

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    },

    async callNext(request: Params) {
        const queue: Params = request;

        try {
            const called: string = callNext(queue.typeQueue);

            if (called == QueueResponses.EmptyQueue) {
                HandleResponseTest(false, 400, called, null);
            } else {
                HandleResponseTest(true, 200, QueueResponses.Called, called);
            }
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    }
}