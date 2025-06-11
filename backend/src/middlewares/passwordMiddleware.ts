import { Request, Response, NextFunction } from "express";
import { Hash, Jwt } from "../utils/systemUtils/security";
import { openDb } from "../db";
import { JwtPayload } from "jsonwebtoken";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { ServerResponses } from "../utils/systemUtils/serverResponses";

export async function passwordVerify(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const { authorization } = req.headers;

    try {
        const data = Jwt.verifyLoginToken(authorization!) as JwtPayload;
        const result = await Hash.compare(data.id, password);

        if (result) {
            next();

        } else {
            HandleResponse(false, 401, ServerResponses.InvalidInput, null, res);
        }

    } catch (error) {
        console.error(error);
        HandleResponse(false, 500, ServerResponses.ServerError, null, res);
    }
}