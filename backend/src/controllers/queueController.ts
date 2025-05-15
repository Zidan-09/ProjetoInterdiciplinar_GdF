import { Request, Response } from "express";
import { PatientCaller } from "../services/queue/services/patientCaller";
import { PriorityHandler } from "../services/queue/managers/priorityHandler";
import { typeQueue } from "../models/queue";
import { ShowQueue } from "../services/queue/services/showQueue";
import { NodeConsult } from "../utils/createNode";

export const QueueController = {
    async queue(req: Request, res: Response) {
        const queueType: typeQueue = req.params.name as typeQueue;
        const queue = ShowQueue.showQueue(queueType);
        res.status(200).json({
            queue: queue
        })
    }
};