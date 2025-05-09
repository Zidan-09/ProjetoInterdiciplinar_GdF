import { Request, Response } from "express";
import { QueueServices, typeQueue } from "../services/queueService";
import { CallsConsult, Triage } from "../models/careFlow";

export let lastCalled: CallsConsult;

export const QueueController = {
    async callRecep(req: Request, res: Response) {
        const call: string = await QueueServices.callNextRecep()
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
        const called: string | Triage = QueueServices.callNextConsult();

        if (typeof called == 'string') {
            res.status(200).json({
                message: called
            });

        } else {
            const call: CallsConsult = {
                patient_id: 1,
                ticket: 'N001',
                calls: 1,
                status: 'Called'
            }
            lastCalled = call;
            
            res.status(201).json({
                status: "sucess",
                message: "Paciente chamado",
                call: call
            })
        }
    },

    async queue(req: Request, res: Response) {
        const queueType: typeQueue = req.params.name as typeQueue;
        const queue = await QueueServices.showQueue(queueType);
        res.status(200).json({
            queue: queue
        })
    },

    async update(req: Request, res: Response) {
        const result: string = QueueServices.verify();

        res.status(200).json({
            message: result
        });
    }
};