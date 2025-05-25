import { Response, Request } from "express";
import { Receptionist, Nurse, Doctor, Admin, ConfirmUser, User } from "../entities/hospitalStaff";
import { EmployeeManager, EmployeeType } from "../services/staff/employeeManager";
import { Login } from "../services/staff/employeeLogin";
import { Jwt } from "../utils/security";
import { showCareFlows } from "../services/staff/showCareFlows";

type Params = { employee: EmployeeType }

const handleResponse = (done: [boolean, any], res: Response) => {
    if (done[0]) {
      res.status(201).json({ status: "success", message: done[1] });
    } else {
      res.status(400).json({ status: "error", message: done[1] });
    }
};

class AdminController {
    static async listCareFlows(req: Request, res: Response) {
        const careFlows = await showCareFlows();

        handleResponse(careFlows, res);
    };
}

class EmployeersConstroller {
    static async register<T extends Receptionist | Nurse | Doctor | Admin>(req: Request<{}, {}, T>, res: Response) {
        const data: T = req.body;
        const done: [boolean, string] = await EmployeeManager.registerEmployee(data);

        handleResponse(done, res)
    };

    static async edit<T extends Receptionist | Nurse | Doctor | Admin>(req: Request<{}, {}, T>, res: Response) {
        const newData: T = req.body;
        const done = await EmployeeManager.editEmployee(newData);
    };

    static async showEmployeers(req: Request<Params>, res: Response) {
        const { employee } = req.params;

        const employeers = await EmployeeManager.showEmployeers(employee)
        res.status(200).json({
            status: "sucess",
            result: employeers,
            message: `${employee} cadastrados exibidos`
        })
    };

    static async activateAccount(req: Request, res: Response) {
        const token = req.query.token as string;
        const data = Jwt.verifyToken(token);

        if (data) {
            
        } else {
            res.status(400).json({
                status: "error",
                message: "Token inválido ou expirado"
            })
        }
    }

    static async confirmAccount(req: Request<{}, {}, ConfirmUser<Receptionist | Nurse | Doctor | Admin>>, res: Response) {

    };

    static async login(req: Request<{}, {}, User>, res: Response) {
        const loginData: User = req.body;

        Login.loginUser(loginData);
    };
}

export { AdminController, EmployeersConstroller };