import { Response, Request } from "express";
import { Receptionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";
import { EmployeeManager, EmployeeType } from "../services/staff/employeeManager";
import { openDb } from "../db";

const db = openDb();

const handleResponse = (done: [boolean, string], res: Response) => {
    if (done[0]) {
      res.status(201).json({ status: "success", message: done[1] });
    } else {
      res.status(400).json({ status: "error", message: done[1] });
    }
};

class ReceptionistController {
    static async register(req: Request, res: Response) {
        const data: Receptionist = req.body;
        const done = await EmployeeManager.registerEmployee(data);
        handleResponse(done, res);
    }

    static async edit(req: Request, res: Response) {
        const newData: Receptionist = req.body;
        const done = await EmployeeManager.editEmployee(newData); // Falta lógica do ID
        res.status(200).json({ message: "Editado (mock)" });
    }
}

class NurseController {
    static async register(req: Request, res: Response) {
        const data: Nurse = req.body;
        const done = await EmployeeManager.registerEmployee(data);
        handleResponse(done, res);
    }

    static async edit(req: Request, res: Response) {
        const newData: Nurse = req.body;
        const done = await EmployeeManager.editEmployee(newData);
        res.status(200).json({ message: "Editado (mock)" });
    }
}

class DoctorController {
    static async register(req: Request, res: Response) {
        const data: Doctor = req.body;
        const done = await EmployeeManager.registerEmployee(data);
        handleResponse(done, res);
    }

    static async edit(req: Request, res: Response) {
        const newData: Doctor = req.body;
        const done = await EmployeeManager.editEmployee(newData);
        res.status(200).json({ message: "Editado (mock)" });
    }
}

class AdminController {
    static async register(req: Request, res: Response) {
        const data: Admin = req.body;
        const done = await EmployeeManager.registerEmployee(data);
        handleResponse(done, res);
    }

    static async edit(req: Request, res: Response) {
        const newData: Admin = req.body;
        const done = await EmployeeManager.editEmployee(newData);
        res.status(200).json({ message: "Editado (mock)" });
    }

    static async listTriages(req: Request, res: Response) {
        try {
            const triages = await (await db).all('SELECT * FROM Triage');
  
            for (const triage of triages) {
                const symptoms = await (await db).all('SELECT symptom FROM Symptom WHERE triage_id = ?', [triage.id]);
            triage.symptoms = symptoms.map((s: { symptom: any; }) => s.symptom);
        }
  
        res.status(200).json({ triages });
        } catch (err) {
            console.error("Erro ao listar triagens:", err);
            res.status(500).json({ error: "Erro ao listar triagens" });
        }
    }

    static async listConsults(req: Request, res: Response) {
        try {
            const consults = await (await db).all('SELECT * FROM Consult');

            for (const consult of consults) {
            try {
                consult.prescriptions = JSON.parse(consult.prescriptions);
            } catch {
                consult.prescriptions = [];
            }
        }
        res.status(200).json({ consults });
        } catch (err) {
            console.error("Erro ao listar consultas:", err);
            res.status(500).json({ error: "Erro ao listar consultas" });
        }
    }
}

class Employeers {
    static async showEmployeers(req: Request, res: Response) {
        const employee: EmployeeType = req.params.employee as EmployeeType;

        const employeers = await EmployeeManager.showEmployeers(employee)
        res.status(200).json({
            status: "sucess",
            message: `${employee} cadastrados`,
            result: employeers
        })
    }
}

export { ReceptionistController, NurseController, DoctorController, AdminController, Employeers };