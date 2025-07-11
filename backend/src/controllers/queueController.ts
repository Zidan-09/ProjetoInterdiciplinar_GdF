import { Request, Response } from "express";
import { ErrorResponse, HandleResponse } from "../utils/systemUtils/handleResponse";
import { TypeQueue } from "../utils/queueUtils/queueEnuns";
import { showQueue } from "../services/queue/services/showQueue";
import { callNext } from "../services/queue/services/patientCaller";
import { QueueResponses } from "../utils/enuns/allResponses";
import { CallConsult, CallTriage } from "../entities/careFlow";

type Params = { typeQueue: TypeQueue }

export const QueueController = {
    async queue(req: Request<Params>, res: Response) {
        const queueType: Params = req.params;

        try {
            const queue = showQueue(queueType);

            if (queue) {
                HandleResponse(true, 200, queueType.typeQueue, queue, res);
            } else {
                HandleResponse(false, 400, QueueResponses.EmptyQueue, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async callNext(req: Request<Params>, res: Response) {
        const queue: TypeQueue = req.params.typeQueue;

        try {
            const called: string | CallTriage | CallConsult = await callNext(queue);

            if (called !== QueueResponses.EmptyQueue) {
                HandleResponse(true, 200, QueueResponses.Called, called, res);
            } else {
                HandleResponse(false, 400, called, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    }
};