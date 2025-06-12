import { Response } from "express";
import { ServerResponses } from "../enuns/allResponses";

export function HandleResponse(status: boolean, statusRes: number, message: string, data: any | null, res: Response) {
    res.status(statusRes).json({
        status: status,
        message: message,
        data: data
    })
}

export function ErrorResponse(error: unknown, res: Response) {
    console.error(error);
    HandleResponse(false, 500, ServerResponses.ServerError, null, res);
}