import { Response, Request } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { ValidateRegister } from "../utils/validators";
import { Recepcionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";

export const RecepcionistController = {
    async register(req: Request<{}, {}, Recepcionist>, res: Response) {
        const data: Recepcionist = req.body;
        let validate: Boolean = await ValidateRegister.verifyEmployee(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerEmployee(data);
            if (done) {
                res.status(201).json({
                    status: "success",
                    message: "Recepcionista cadastrado com sucesso!"
                });
            } else {
                res.status(400).json({
                    message: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                message: "Recepcionista já cadastrado",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            // Recepcionistas cadastrados!
            message: "recepcionistas exibidos!"
        })
    },

    async edit(req: Request, res: Response) {

    }
}

export const NurseController = {
    async register(req: Request<{}, {}, Nurse>, res: Response) {
        const data: Nurse = req.body;
        let validate: Boolean = await ValidateRegister.verifyEmployee(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerEmployee(data);
            if (done) {
                res.status(201).json({
                    status: "success",
                    message: "Enfermeiro(a) cadastrado(a) com sucesso!"
                });
            } else {
                res.status(400).json({
                    message: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                message: "Enfermeiro(a) já cadastrado(a)",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            // Enfermeiros(as) cadastrados(as)
            message: "Enfermeiros exibidos!"
        })
    },

    async edit(req: Request, res: Response) {
        
    }
}

export const DoctorController = {
    async register(req: Request<{}, {}, Doctor>, res: Response) {
        const data: Doctor = req.body;
        let validate: Boolean = await ValidateRegister.verifyEmployee(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerEmployee(data);
            if (done) {
                res.status(201).json({
                    status: "success",
                    message: "Médico(a) cadastrado(a) com sucesso!"
                });
            } else {
                res.status(400).json({
                    message: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                message: "Médico(a) já cadastrado(a)",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            // Médicos(as) cadastrados(as)
            message: "Médicos exibidos!"
        })
    },

    async edit(req: Request, res: Response) {
        
    }
}

export const AdminController = {
    async register(req: Request<{}, {}, Admin>, res: Response) {
        const data: Admin = req.body;
        let validate: Boolean = await ValidateRegister.verifyEmployee(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerEmployee(data);
            if (done) {
                res.status(201).json({
                    status: "success",
                    message: "Administrador(a) cadastrado(a) com sucesso!"
                });
            } else {
                res.status(400).json({
                    message: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                message: "Administrador(a) já cadastrado(a)",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            // Admins cadastrados
            message: "Administradores exibidos!"
        })
    },

    async edit(req: Request, res: Response) {
        
    }
}