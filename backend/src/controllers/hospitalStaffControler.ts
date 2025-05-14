import { Response, Request } from "express";
import { Recepcionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";
import { EmployeeManager, EmployeeType } from "../services/staff/employeeManager";

const handleResponse = (done: [boolean, string], res: Response) => {
  if (done[0]) {
    res.status(201).json({ status: "success", message: done[1] });
  } else {
    res.status(400).json({ status: "error", message: done[1] });
  }
};

class RecepcionistController {
  static async register(req: Request, res: Response) {
    const data: Recepcionist = req.body;
    const done = await EmployeeManager.registerEmployee(data);
    handleResponse(done, res);
  }

  static async edit(req: Request, res: Response) {
    const newData: Recepcionist = req.body;
    const done = await EmployeeManager.editEmployee(1, newData); // Falta lógica do ID
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
    const done = await EmployeeManager.editEmployee(2, newData);
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
    const done = await EmployeeManager.editEmployee(3, newData);
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
    const done = await EmployeeManager.editEmployee(4, newData);
    res.status(200).json({ message: "Editado (mock)" });
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

export { RecepcionistController, NurseController, DoctorController, AdminController, Employeers };