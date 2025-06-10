import { Request, Response, NextFunction } from "express";
import { openDb } from "../db";
import { Jwt } from "../utils/systemUtils/security";
import { JwtPayload } from "jsonwebtoken";
import { EmployeeType } from "../utils/personsUtils/generalEnuns";
import { HandleResponse } from "../utils/systemUtils/handleResponse";

async function searchAccessLevel(id: number, employeeType: EmployeeType, res: Response, next: NextFunction) {
    const db = await openDb();
    const result = await db.get('SELECT accessLevel FROM Employee WHERE id = ?', [id]);

    if (result.accessLevel === employeeType) {
        next()
    } else {
        HandleResponse(false, 400, 'Não autorizado', null, res);
    }
}

export const AccessLevelMiddleware = {
    async receptionistAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const valid = Jwt.verifyLoginToken(token) as JwtPayload;
            searchAccessLevel(valid.id, EmployeeType.Receptionist, res, next);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },
    
    async nurseAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        
        try {
            const token = authorization!.split(' ')[1];
            const valid = Jwt.verifyLoginToken(token) as JwtPayload;
            searchAccessLevel(valid.id, EmployeeType.Nurse, res, next);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },
    
    async doctorAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        
        try {
            const token = authorization!.split(' ')[1];
            const valid = Jwt.verifyLoginToken(token) as JwtPayload;
            searchAccessLevel(valid.id, EmployeeType.Doctor, res, next);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },
    
    async adminAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        
        try {
            const token = authorization!.split(' ')[1];
            const valid = Jwt.verifyLoginToken(token) as JwtPayload;
            searchAccessLevel(valid.id, EmployeeType.Admin, res, next);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    }
}