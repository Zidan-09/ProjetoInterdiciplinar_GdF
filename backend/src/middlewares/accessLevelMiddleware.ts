import { Request, Response, NextFunction } from "express";
import { openDb } from "../db";
import { Jwt } from "../utils/systemUtils/security";
import { JwtPayload } from "jsonwebtoken";
import { EmployeeType } from "../utils/enuns/generalEnuns";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { ServerResponses } from "../utils/enuns/allResponses";

function accessMiddleware(requiredAccess: EmployeeType) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;
        const db = await openDb();

        try {
            const token = authorization!.split(' ')[1];
            const valid = Jwt.verifyLoginToken(token) as JwtPayload;

            const result = await db.get('SELECT accessLevel FROM Employee WHERE id = ?', [valid.id]);

            if (result.accessLevel === requiredAccess) {
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