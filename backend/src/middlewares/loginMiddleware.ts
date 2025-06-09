import { Request, Response } from "express";
import { Jwt } from "../utils/systemUtils/security";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { openDb } from "../db";

export function loginVerify(req: Request, res: Response) {
    const { authorization } = req.headers;
    const db = await openDb();


    if (!authorization) {
        HandleResponse(false, 400, 'invalid_token', null, res);
    }

    try {
        const token = authorization!.split(' ')[1];

        const data = Jwt.verifyLoginToken(token);

        const user = await db.get('SELECT * FROM User WHERE username')


    } catch (error) {
        console.error(error);
    }
}