import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { Jwt } from "../utils/systemUtils/security";
import { JwtPayload } from "jsonwebtoken";
import { EmployeeType } from "../utils/enuns/generalEnuns";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { ServerResponses } from "../utils/enuns/allResponses";
import { RowDataPacket } from "mysql2";

function accessMiddleware(requiredAccess: EmployeeType) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const valid = Jwt.verifyLoginToken(token) as JwtPayload;

            const [result] = await db.execute<RowDataPacket[]>('SELECT accessLevel FROM Employee WHERE id = ?', [valid.id]);

            if (!result || result[0].accessLevel === requiredAccess) {
                next();

            } else {
                HandleResponse(false, 403, ServerResponses.AccessDenied, null, res);
            }
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    };
};

export const AccessLevelMiddleware = {
    receptionist: accessMiddleware(EmployeeType.Receptionist),
    nurse: accessMiddleware(EmployeeType.Nurse),
    doctor: accessMiddleware(EmployeeType.Doctor),
    admin: accessMiddleware(EmployeeType.Admin)
}