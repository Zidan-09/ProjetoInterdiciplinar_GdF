import { NextFunction, Request, Response } from "express";
import { Jwt } from "../utils/systemUtils/security";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { db } from "../db";
import { JwtPayload } from "jsonwebtoken";
import { ServerResponses } from "../utils/enuns/allResponses";

export async function loginVerify(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return HandleResponse(false, 400, ServerResponses.MissingToken, null, res);
    }

    try {
        const token = authorization!.split(' ')[1];

        const data = Jwt.verifyLoginToken(token) as JwtPayload;

        const user = await db.execute('SELECT * FROM User WHERE user_id = ?', [data.id])

        if (user) {           
            next();
            
        } else {
            HandleResponse(false, 400, ServerResponses.Unauthorized, null, res);
        }


    } catch (error) {
        console.error(error);
        HandleResponse(false, 500, ServerResponses.ServerError, null, res);
    }
}