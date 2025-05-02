import { Request, Response } from "express";
import { QueueServices, typeQueue } from "../services/queueService";
import { attendCalled, consultCalled, triageCalled } from "../utils/queueCalleds";

export const QueueController = {
    async callAttend(req: Request, res: Response) {
        const call: string = await QueueServices.callNextAttend()
        res.json({
            call: call
        })
        attendCalled.push(call);
    },

    async callTriage(req: Request, res: Response) {
        const call: string = await QueueServices.callNextTriage()
        res.json({
            call: call
        })
        triageCalled.push(call);
    },

    async callConsult(req: Request, res: Response) {
        const call: string = await QueueServices.callNextConsult();
        res.json({
            call: await QueueServices.callNextConsult()
        })
        consultCalled.push(call);
    },

    async queue(req: Request, res: Response) {
        const queueType: typeQueue = req.body;
        QueueServices.showQueue(queueType);
    }
}