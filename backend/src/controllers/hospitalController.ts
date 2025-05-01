import { Request, Response } from "express";
import { HospitalManager } from "../services/hospitalManager";
import { CriteriaData, AdminData } from "../models/interfaces";
import { criteria } from "../models/criteria";
import { prisma } from "../prismaTests";
import { ValidateRegister } from "../utils/validateRegister";

export const AdminController = {
    async changeCriteria(req: Request, res: Response) {
        const newCriteria: CriteriaData = req.body;

        HospitalManager.changeCriteria(newCriteria);

        res.status(201).json({
            mensage: "Critérios atualizados!",
            newCriteria: criteria
        })
    },

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
        prisma.admin.findMany();
        res.status(201).json({
            mensage: "Administradores exibidos!"
        })
    }
}