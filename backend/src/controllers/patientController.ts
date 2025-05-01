import { Request, Response } from "express";
import { RegistrationPatient } from "../models/interfaces";
import { Attend } from "../models/careFlow";
import { ValidateRegister } from "../utils/validateRegister";
import { PatientServices } from "../services/patientServices";
import { prisma } from "../prismaTests";

export const PatientController = {
    async register(req: Request, res: Response) {
        const data: RegistrationPatient = req.body;
        let validate: Boolean = ValidateRegister.verifyPatient(data.patient);

        if (validate) {
            let done: Boolean = await PatientServices.register(data.patient);
            if (done) {
                res.status(201).json({
                    mensage: "Paciente cadastrado com sucesso!"
                });
                const attend: Attend = new Attend(data.attend.ticket, data.attend.recepcionist_id);
            } else {
                res.status(400).json({
                    mensage: "Erro ao cadastrar!"
                });
            }
        } else {
            res.json({
                mensage: "Paciente já cadastrado",
            })
        }
    },

    async list(req: Request, res: Response) {
        const patients = prisma.patient.findMany();
        res.status(201).json({
            patients: patients,
            mensage: "Lista de pacientes exibida"
        })
    }
}