import { Request, Response } from "express";
import { typeQueue } from "../entities/queue";
import { ShowQueue } from "../services/queue/services/showQueue";
import { PatientCaller } from "../services/queue/services/patientCaller";

export const QueueController = {
    async queue(req: Request, res: Response) {
        const queueType: typeQueue = req.params.name as typeQueue;
        const queue = ShowQueue.showQueue(queueType);
        res.status(200).json({
            queue: queue
        })
    },

    async callNextRecep(req: Request, res: Response) {
        const called: string = PatientCaller.callNextRecep();

        res.status(200).json({
            message: called
        })
    },

    async callNextTriage(req: Request, res: Response) {
        const called: string = PatientCaller.callNextTriage()

        if (called == 'Fila vazia') {
            res.status(200).json({
                message: called
            })

        } else {
            res.status(200).json({
                status: "sucess",
                message: `${called}, vá para a triagem`
            })
        }
    },

    async callNextConsult(req: Request, res: Response) {
        const called: string = PatientCaller.callNextConsult();

        if (called == 'Fila vazia') {
            res.status(200).json({
                message: called
            });
        } else {
            res.status(200).json({
                status: "success",
                message: `${called}, vá para o consultório`
            })
        }
    },
};