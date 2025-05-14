import { Request, Response } from "express";
import { PatientCaller } from "../services/queue/services/patientCaller";
import { PriorityHandler } from "../services/queue/managers/priorityHandler";
import { typeQueue } from "../models/queue";
import { ShowQueue } from "../services/queue/services/showQueue";

export const QueueController = {
    async callRecep(req: Request, res: Response) {
        const call = PatientCaller.callNextRecep()
        res.json({
            call: call
        })
    },

    async callTriage(req: Request, res: Response) {
        const call = PatientCaller.callNextTriage()
        res.json({
            call: call
        })
    },

    async callConsult(req: Request, res: Response) {
        const called = PatientCaller.callNextConsult();

        if (typeof called == 'string') {
            res.status(200).json({
                message: called
            });

        } else {            
            res.status(201).json({
                status: "sucess",
                message: "Paciente chamado",
                call: 'result'
            })
        }
    },

    async queue(req: Request, res: Response) {
        const queueType: typeQueue = req.params.name as typeQueue;
        const queue = ShowQueue.showQueue(queueType);
        res.status(200).json({
            queue: queue
        })
    }
};