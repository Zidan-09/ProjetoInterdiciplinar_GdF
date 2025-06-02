import { Request, Response } from "express";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { QueueReturns, TypeQueue } from "../utils/queueUtils/queueEnuns";
import { ShowQueue } from "../services/queue/services/showQueue";
import { PatientCaller } from "../services/queue/services/patientCaller";

type Params = { typeQueue: TypeQueue }

export const QueueController = {
    async queue(req: Request<Params>, res: Response) {
        const queue: Params = req.params;

        try {
            const queueT = ShowQueue.showQueue(queue);
            HandleResponse(true, 200, queue.typeQueue, queueT, res);

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },

    async callNext(req: Request<Params>, res: Response) {
        const queue: TypeQueue = req.params.typeQueue;

        try {
            const called: string = PatientCaller.callNext(queue);

            if (called === QueueReturns.EmptyQueue) {
                HandleResponse(false, 200, called, null, res);
            } else {
                HandleResponse(true, 200, QueueReturns.Called, called, res);
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    }
};