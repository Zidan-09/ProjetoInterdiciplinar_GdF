import { QueueReturns, TypeQueue } from "../../utils/queueUtils/queueEnuns";
import { ShowQueue } from "../../services/queue/services/showQueue";
import { PatientCaller } from "../../services/queue/services/patientCaller";
import { HandleResponseTest } from "./handleResponseTest";

type Params = { typeQueue: TypeQueue };

export const queueControllerTest = {
    async queue(request: Params) {
        const queue: Params = request;

        try {
            const queueT = ShowQueue.showQueue(queue);
            HandleResponseTest(true, 200, queue.typeQueue, queueT);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    },

    async callNext(request: Params) {
        const queue: Params = request;

        try {
            const called: string = PatientCaller.callNext(queue.typeQueue);

            if (called == QueueReturns.EmptyQueue) {
                HandleResponseTest(false, 400, called, null);
            } else {
                HandleResponseTest(true, 200, QueueReturns.Called, called);
            }
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    }
}