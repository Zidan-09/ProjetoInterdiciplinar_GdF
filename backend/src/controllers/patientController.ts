import { Request, Response } from "express";
import { Patient, PatientData } from "../models/patient";
import { Attend } from "../models/careFlow";

export const PatientController = {
    async register(req: Request, res: Response) {
        const patientdata: PatientData = req.body;
        patientdata.dob = new Date(patientdata.dob)
        const patient: Patient = new Patient(patientdata.name, patientdata.dob, patientdata.maritalStatus, patientdata.cpf, patientdata.rg, patientdata.contacts, patientdata.gender, patientdata.healthPlan, patientdata.address);
        const attend: Attend = new Attend('', 1)
    }
}