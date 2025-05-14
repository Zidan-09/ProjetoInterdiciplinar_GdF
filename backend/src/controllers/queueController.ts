import { Request, Response } from "express";
import { PatientCaller } from "../services/queue/services/patientCaller";
import { PriorityHandler } from "../services/queue/managers/priorityHandler";
import { typeQueue } from "../models/queue";
import { ShowQueue } from "../services/queue/services/showQueue";
import { NodeConsult } from "../utils/createNode";

export const QueueController = {
    async callRecep(req: Request, res: Response) {
        const call = PatientCaller.callNextRecep()
        res.json({
            call: call
        })
    },

    async callTriage(req: Request, res: Response) {
        const call = PatientCaller.callNextTriage()
        
        if (call === 'Fila vazia') {
            res.status(200).json({
                message: call
            });

        } else {            
            res.status(200).json({
                status: "sucess",
                message: "Paciente chamado",
                call: `${call.patient_name}, vá para a triagem`
            })
        }
    },

    async callConsult(req: Request, res: Response) {
        const call: 'Fila vazia' | NodeConsult = PatientCaller.callNextConsult();

        if (call === 'Fila vazia') {
            res.status(200).json({
                message: call
            });

        } else {            
            res.status(200).json({
                status: "sucess",
                message: "Paciente chamado",
                call: `${call.patient_name}, vá para o consultório`
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