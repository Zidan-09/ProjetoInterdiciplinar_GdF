import { Response, Request } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { Recepcionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";

export const EmployeeController = {
    async register(req: Request<{}, {}, Recepcionist|Nurse|Doctor|Admin>, res: Response) {
        const data: Recepcionist = req.body;
        let done: [boolean, string] = await HospitalManager.registerEmployee(data);
        if (done[1]) {
            res.status(201).json({
                status: "sucess",
                message: done[0]
            });
        } else {
            res.status(400).json({
                status: "erro",
                message: done[0]
            });
        }
    },

    async list(req: Request, res: Response) {
        const employee = req.params.employee;

        res.status(200).json({
            message: `${employee} exibidos!`
        })
    },

    async edit(req: Request, res: Response) {

    }
}