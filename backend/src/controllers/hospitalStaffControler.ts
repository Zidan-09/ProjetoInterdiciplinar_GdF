import { Response, Request } from "express";
import { Nurse, Doctor, ConfirmUser, LoginData, Employee } from "../entities/hospitalStaff";
import { EmployeeManager } from "../services/adm/employeeManager";
import { EmployeeType } from "../utils/personsUtils/generalEnuns";
import { Login } from "../services/adm/employeeLogin";
import { Jwt } from "../utils/systemUtils/security";
import { showCareFlows } from "../services/adm/showCareFlows";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { EmployeeResponseMessage } from "../utils/personsUtils/generalEnuns";
import { ValidateRegister } from "../utils/personsUtils/validators";
import { ShowReports } from "../services/adm/showReports";

type Params = { employee: EmployeeType }

class AdminController {
    static async listCareFlows(req: Request, res: Response) {
        try {
            const careFlows = await showCareFlows();
            HandleResponse(true, 200, "Careflows showed", careFlows, res);

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    };

    static async queueReport(req: Request, res: Response) {
        const period = req.body;

        try {
            ShowReports.queueTime(period);

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    }
}

class EmployersConstroller {
    static async register<T extends Employee | Nurse | Doctor>(req: Request<{}, {}, T>, res: Response) {
        const data: T = req.body;

        try {
            const valid = await ValidateRegister.verifyEmployee(data);

            if (valid) {
                const done: EmployeeResponseMessage = await EmployeeManager.registerEmployee(data);
    
                if (done === EmployeeResponseMessage.AwaitingConfirmation) {
                    HandleResponse(true, 200, done, data, res);
                } else {
                    HandleResponse(false, 400, done, data, res);
                }
            } else {
                HandleResponse(false, 400, EmployeeResponseMessage.AlreadyRegistered, null, res);
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    };

    static async edit<T extends Employee | Nurse | Doctor>(req: Request<{}, {}, T>, res: Response) {
        const newData: T = req.body;

        try {
            await EmployeeManager.editEmployee(newData);
            HandleResponse(true, 200, "Editado", newData, res);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
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
        
        try {
            const data = Jwt.verifyToken(token);

            if (data) {
                HandleResponse(true, 200, "TESTE", data, res);
            }

        } catch (error) {
            console.error(error)
        }
    }

    static async authAccount(req: Request<{}, {}, ConfirmUser<Employee | Nurse | Doctor>>, res: Response) {
        const { data, user } = req.body;

        try {
            const done: EmployeeResponseMessage = await EmployeeManager.authAccount(data, user);

            if (done === EmployeeResponseMessage.Error || done === EmployeeResponseMessage.RegistrationInProgress) {
                HandleResponse(false, 400, done, null, res);
            } else {
                HandleResponse(true, 200, done, data && user, res);
            }
            
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    }

    static async login(req: Request<{}, {}, LoginData>, res: Response) {
        const loginDataReq: LoginData = req.body;

        try {
            await Login.loginUser(loginDataReq);
            HandleResponse(true, 200, EmployeeResponseMessage.EmployeeLoggedIn, loginDataReq, res);

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    };
}

export { AdminController, EmployersConstroller };