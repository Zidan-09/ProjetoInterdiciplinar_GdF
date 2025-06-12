import { NextFunction, Request, Response } from "express";
import { Jwt } from "../utils/systemUtils/security";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { db } from "../db";
import { JwtPayload } from "jsonwebtoken";
import { ServerResponses } from "../utils/enuns/allResponses";
import { RowDataPacket } from "mysql2";

export async function loginVerify(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return HandleResponse(false, 400, ServerResponses.MissingToken, null, res);
    }

    try {
        const token = authorization!.split(' ')[1];

        const data = Jwt.verifyLoginToken(token);

        if (!data) {
            return HandleResponse(false, 400, ServerResponses.InvalidToken, null, res);
        }

        const [user] = await db.execute<RowDataPacket[]>('SELECT * FROM User WHERE user_id = ?', [data.id])

        if (user) {           
            next();
            
        } else {
            return HandleResponse(false, 400, ServerResponses.Unauthorized, null, res);
        }


    } catch (error) {
        console.error(error);
        return HandleResponse(false, 500, ServerResponses.ServerError, null, res);
    }
}