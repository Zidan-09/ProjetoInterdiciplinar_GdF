import { Request, Response } from "express";
import { typeQueue } from "../entities/queue";
import { ShowQueue } from "../services/queue/services/showQueue";
import { NodeTriage } from "../utils/createNode";
import { PatientCaller } from "../services/queue/services/patientCaller";
import { CallsConsult } from "../entities/careFlow";

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
        const called: NodeTriage | 'Fila vazia' = PatientCaller.callNextTriage()

        if (called == 'Fila vazia') {
            res.status(200).json({
                message: called
            })

        } else {
            res.status(200).json({
                status: "sucess",
                message: `${called.patient_name}, vá para a triagem`
            })
        }
    },

    async callNextConsult(req: Request, res: Response) {
        const called: CallsConsult | 'Fila vazia' = PatientCaller.callNextConsult();

        if (called == 'Fila vazia') {
            res.status(200).json({
                message: called
            });
        } else {
            res.status(200).json({
                status: "success",
                message: `${called.patient_name}, vá para o consultório`
            })
        }
    },
};