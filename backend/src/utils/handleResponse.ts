import { Response } from "express";

export function HandleResponse(status: boolean, statusRes: number, message: string, data: any | null, res: Response) {
    res.status(statusRes).json({
        status: status,
        message: message,
        data: data
    })
}