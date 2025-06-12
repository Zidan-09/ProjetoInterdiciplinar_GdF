import { Response, Request } from "express";
import { Nurse, Doctor, ConfirmUser, User, Employee } from "../entities/hospitalStaff";
import { EmployeeManager } from "../services/adm/employeeManager";
import { EmployeeType } from "../utils/enuns/generalEnuns";
import { Login } from "../services/adm/employeeLogin";
import { Jwt } from "../utils/systemUtils/security";
import { HandleResponse, ErrorResponse } from "../utils/systemUtils/handleResponse";
import { ValidateRegister } from "../utils/personsUtils/validators";
import { EmployeeResponses, AdminResponses, ServerResponses } from "../utils/enuns/allResponses";

type Params = { employee: EmployeeType }

export const EmployeesConstroller = {
    async register<T extends Employee | Nurse | Doctor>(req: Request<{}, {}, T>, res: Response) {
        const data: T = req.body;

        try {
            const valid = await ValidateRegister.verifyEmployee(data);

            if (valid) {
                const done: EmployeeResponses = await EmployeeManager.registerEmployee(data);
    
                if (done === EmployeeResponses.AwaitingConfirmation) {
                    HandleResponse(true, 200, done, data, res);
                } else {
                    HandleResponse(false, 400, done, data, res);
                }
            } else {
                HandleResponse(false, 400, EmployeeResponses.AlreadyRegistered, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async edit<T extends Employee | Nurse | Doctor>(req: Request<{}, {}, T>, res: Response) {
        const newData: T = req.body;

        try {
            await EmployeeManager.editEmployee(newData);
            HandleResponse(true, 200, AdminResponses.EmployeeEdited, newData, res);
        } catch (error) {
            ErrorResponse(error, res);
        }
    },
    
    async delete(req: Request<{}, {}, Employee>, res: Response) {
        const employee: Employee = req.body;

        try {
            const result = await EmployeeManager.delete(employee);

            if (result) {
                if (result === AdminResponses.DeleteEmployeeFailed) {
                    HandleResponse(false, 400, result, null, res);
                } else {
                    HandleResponse(true, 200, result, null, res);
                }
                
            } else {
                HandleResponse(false, 400, EmployeeResponses.Error, null, res);
            }
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async showEmployeers(req: Request<Params>, res: Response) {
        const { employee } = req.params;

        try {
            const employers = await EmployeeManager.showEmployeers(employee);

            if (employers) {
                HandleResponse(true, 200, AdminResponses.ShowedEmployers, employers, res);
            } else {
                HandleResponse(false, 400, AdminResponses.ShowEmployersFailed, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async activateAccount(req: Request, res: Response) {
        const token = req.query.token as string;
        
        try {
            const data = Jwt.verifyRegisterToken(token);

            if (data) {
                HandleResponse(true, 200, EmployeeResponses.AwaitingConfirmation, data, res);
            } else {
                HandleResponse(false, 400, EmployeeResponses.Error, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async authAccount(req: Request<{}, {}, ConfirmUser<Employee | Nurse | Doctor>>, res: Response) {
        const { data, user } = req.body;

        try {
            const done: EmployeeResponses = await EmployeeManager.authAccount(data, user);

            if (done === EmployeeResponses.Error || done === EmployeeResponses.RegistrationInProgress) {
                HandleResponse(false, 400, done, null, res);
            } else {
                HandleResponse(true, 200, done, data && user, res);
            }
            
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async login(req: Request<{}, {}, User>, res: Response) {
        const loginDataReq: User = req.body;

        try {
            const logged = await Login.loginUser(loginDataReq);

            if (logged) {
                HandleResponse(true, 200, EmployeeResponses.EmployeeLoggedIn, logged, res);
            } else {
                HandleResponse(false, 400, EmployeeResponses.InvalidInput, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async forgotPassword(req: Request<{}, {}, { email: string }>, res: Response) {
        const data = req.body;

        try {
            await Login.forgotPassword(data.email);

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async changePassword(req: Request<{}, {}, { newPassword: string }>, res: Response) {
        const data = req.body;

        try {
            const result = await Login.newPassword(data.newPassword);

            if (result) {
                HandleResponse(true, 200, EmployeeResponses.PasswordUpdated, null, res);
            } else {
                HandleResponse(false, 400, EmployeeResponses.Error, null, res);
            }
            
        } catch (error) {
            ErrorResponse(error, res);
        }
    }
}