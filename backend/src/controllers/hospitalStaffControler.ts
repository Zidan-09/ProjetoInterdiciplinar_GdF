import { Response, Request } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { prisma } from "../prismaTests"
import { AdminData, DoctorData, NurseData, RecepcionistData } from "../models/interfaces";
import { ValidateRegister } from "../utils/validateRegister";

export const RecepcionistController = {
    async register(req: Request, res: Response) {
        const data: RecepcionistData = req.body;
        let validate: Boolean = ValidateRegister.verifyUser(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerUser(data);
            if (done) {
                res.status(201).json({
                    mensage: "Recepcionista cadastrado com sucesso!"
                });
            } else {
                res.status(400).json({
                    mensage: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                mensage: "Recepcionista já cadastrado",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            recepcionists: await prisma.recepcionist.findMany(),
            mensage: "recepcionistas exibidos!"
        })
    }
}

export const NurseController = {
    async register(req: Request, res: Response) {
        const data: NurseData = req.body;
        let validate: Boolean = ValidateRegister.verifyUser(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerUser(data);
            if (done) {
                res.status(201).json({
                    mensage: "Enfermeiro(a) cadastrado(a) com sucesso!"
                });
            } else {
                res.status(400).json({
                    mensage: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                mensage: "Enfermeiro(a) já cadastrado(a)",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            nurses: await prisma.nurse.findMany(),
            mensage: "Enfermeiros exibidos!"
        })
    }
}

export const DoctorController = {
    async register(req: Request, res: Response) {
        const data: DoctorData = req.body;
        let validate: Boolean = ValidateRegister.verifyUser(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerUser(data);
            if (done) {
                res.status(201).json({
                    mensage: "Médico(a) cadastrado(a) com sucesso!"
                });
            } else {
                res.status(400).json({
                    mensage: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                mensage: "Médico(a) já cadastrado(a)",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            doctor: await prisma.doctor.findMany(),
            mensage: "Médicos exibidos!"
        })
    }
}

export const AdminController = {
    async register(req: Request, res: Response) {
        const data: AdminData = req.body;
        let validate: Boolean = ValidateRegister.verifyUser(data);

        if (validate) {
            let done: Boolean = await HospitalManager.registerUser(data);
            if (done) {
                res.status(201).json({
                    mensage: "Administrador(a) cadastrado(a) com sucesso!"
                });
            } else {
                res.status(400).json({
                    mensage: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                mensage: "Administrador(a) já cadastrado(a)",
            })
        }
    },

    async list(req: Request, res: Response) {
        res.status(200).json({
            admins: await prisma.admin.findMany(),
            mensage: "Administradores exibidos!"
        })
    }
}