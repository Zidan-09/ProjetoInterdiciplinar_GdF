import { Request, Response } from "express";
import { QueueServices, typeQueue } from "../services/queueService";
// import { attendCalled, consultCalled, triageCalled } from "../utils/queueCalleds";

export const QueueController = {
    async callAttend(req: Request, res: Response) {
        const call: string = await QueueServices.callNextAttend()
        res.json({
            call: call
        })
        // attendCalled.push(call);
    },

    async callTriage(req: Request, res: Response) {
        const call: string = await QueueServices.callNextTriage()
        res.json({
            call: call
        })
        // triageCalled.push(call);
    },

    async callConsult(req: Request, res: Response) {
        const call: string = await QueueServices.callNextConsult();
        res.json({
            call: call
        })
        // consultCalled.push(call);
    },

    async queue(req: Request, res: Response) {
        const queueType = req.body;
        const queue = await QueueServices.showQueue(queueType.typeQueue);
        res.status(200).json({
            queue: queue
        })
    }
}