import { NextFunction, Request, Response } from "express";
import { Jwt } from "../utils/systemUtils/security";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { openDb } from "../db";
import { JwtPayload } from "jsonwebtoken";

export async function loginVerify(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const db = await openDb();


    if (!authorization) {
        HandleResponse(false, 400, 'invalid_token', null, res);
    }

    try {
        const token = authorization!.split(' ')[1];

        const data = Jwt.verifyLoginToken(token) as JwtPayload;

        const user = await db.get('SELECT * FROM User WHERE user_id = ?', [data.id])

        if (user) {           
            next();
            
        } else {
            HandleResponse(false, 400, 'usuário não autorizado', null, res);
        }


    } catch (error) {
        console.error(error);
    }
}