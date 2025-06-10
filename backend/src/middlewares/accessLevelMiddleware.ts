import { Request, Response, NextFunction } from "express";
import { openDb } from "../db";
import { Jwt } from "../utils/systemUtils/security";
import { JwtPayload } from "jsonwebtoken";
import { EmployeeType } from "../utils/personsUtils/generalEnuns";

async function searchAccessLevel(id: JwtPayload, employeeType: EmployeeType, res: Response, next: NextFunction) {
    const db = await openDb();

    const accessLevel = await db.get('SELECT accessLevel FROM Employee WHERE id = ?', [id]);

    if (accessLevel === employeeType) {
        next()
    } else {
        res.status(400).json({
            "erro": "não autorizado"
        })
    }
}

export const AccessLevelMiddleware = {
    async receptionistAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const id = Jwt.verifyLoginToken(authorization!) as JwtPayload;
            searchAccessLevel(id, EmployeeType.Receptionist, res, next);
        } catch (error) {
            console.error(error);
            return 'error'
        }
    },

    async nurseAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const id = Jwt.verifyLoginToken(authorization!) as JwtPayload;
            searchAccessLevel(id, EmployeeType.Nurse, res, next);
        } catch (error) {
            console.error(error);
            return 'error'
        }
    },

    async doctorAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const id = Jwt.verifyLoginToken(authorization!) as JwtPayload;
            searchAccessLevel(id, EmployeeType.Doctor, res, next);
        } catch (error) {
            console.error(error);
            return 'error'
        }
    },

    async adminAccessLevel(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const id = Jwt.verifyLoginToken(authorization!) as JwtPayload;
            searchAccessLevel(id, EmployeeType.Admin, res, next);
        } catch (error) {
            console.error(error);
            return 'error'
        }
    }
}