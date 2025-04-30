import { Request, Response } from "express";
import { Patient } from "../models/patient";
import { Registration } from "../models/interfaces";
import { Attend } from "../models/careFlow";
import { ValidateRegister } from "../utils/validateRegister";
import { PatientRegistration } from "../services/patientServices";

export const PatientController = {
    async register(req: Request, res: Response) {
        const data: Registration = req.body;
        let validate: Boolean = ValidateRegister.verify(data.patient);

        if (validate) {
            let done: Boolean = PatientRegistration.register(data.patient);
            if (done) {
                res.json({
                    mensage: "Paciente cadastrado com sucesso!"
                });
                const attend: Attend = new Attend(data.attend.ticket, data.attend.recepcionist_id);
            }
        } else {
            res.json({
                mensage: "Paciente já cadastrado",
            })
        }
    }   
}