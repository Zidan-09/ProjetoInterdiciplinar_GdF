import { Request, Response } from "express";
import { RegistrationPatient } from "../models/interfaces";
import { ValidateRegister } from "../utils/validateRegister";
import { PatientServices } from "../services/patientServices";
import { prisma, somarID } from "../prismaTests";
import { Patient } from "../models/patient";
import { NoTriage } from "../utils/createNoTriage";
import { QueueServices } from "../services/queueService";

export const PatientController = {
    async register(req: Request<{}, {}, RegistrationPatient>, res: Response) {
        const data: RegistrationPatient = req.body;
        let validate: Boolean = ValidateRegister.verifyPatient(data.patient);

        if (validate) {
            let done: Boolean = await PatientServices.register(data.patient);
            if (done) {
                res.status(201).json({
                    mensage: "Paciente cadastrado com sucesso!",
                });
                somarID('patient');

                const patient: Patient = new Patient(
                    data.patient.name,
                    new Date(data.patient.dob),
                    data.patient.maritalStatus,
                    data.patient.cpf,
                    data.patient.rg,
                    data.patient.contacts,
                    data.patient.gender,
                    data.patient.healthPlan,
                    data.patient.address
                )

                const no: NoTriage = new NoTriage(patient.name);
                QueueServices.insertTriageQueue(no);
                
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
        res.status(200).json({
            patients: await prisma.patient.findMany(),
            mensage: "Lista de pacientes exibida"
        })
    }
}