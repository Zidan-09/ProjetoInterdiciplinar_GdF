import { Response, Request } from "express";
import { Nurse, Doctor, ConfirmUser, User, Employee } from "../entities/hospitalStaff";
import { EmployeeManager } from "../services/adm/employeeManager";
import { EmployeeType } from "../utils/enuns/generalEnuns";
import { Login } from "../services/adm/employeeLogin";
import { Jwt } from "../utils/systemUtils/security";
import { HandleResponse } from "../utils/systemUtils/handleResponse";
import { ValidateRegister } from "../utils/personsUtils/validators";
import { Periods } from "../utils/enuns/periods";
import { CareFlowReports } from "../services/adm/reports/careFlowReports";
import { QueueReports } from "../services/adm/reports/queueReports";
import { PatientManager } from "../services/hospital/patientManager";
import { TriageCategoryManager } from "../services/adm/triageCategoryManager";
import { Patient } from "../entities/patient";
import { TriageCategory, UpdateTriageCategory } from "../entities/triageCategory";
import { EmployeeResponses, ServerResponses, AdminResponses } from "../utils/enuns/allResponses";

type Params = { employee: EmployeeType }
type AdminParams = { period: Periods }
type Category = { triageCategory: string }

const AdminController = {
    async listCareFlows(req: Request, res: Response) {
        try {
            const careFlows = await CareFlowReports.showAllCareFlows();

            if (careFlows) {
                HandleResponse(true, 200, AdminResponses.ShowedCareFlows, careFlows, res);
            } else {
                HandleResponse(false, 400, AdminResponses.ShowCareFlowsFailed, null, res);
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async queueReport(req: Request<AdminParams>, res: Response) {
        const period = req.params;

        try {
            const queueTimes = await QueueReports.getAverageQueueTimes(period.period);
            HandleResponse(true, 200, AdminResponses.ShowedQueueReport, queueTimes, res);

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async careFlowTimeReport(req: Request<AdminParams>, res: Response) {
        const period = req.params;

        try {
            const consultTime = await CareFlowReports.getAverageConsultTime(period.period);
            const triageTime = await CareFlowReports.getAverageTriageTime(period.period);
            const totalTime = await CareFlowReports.getAverageCareFlowTime(period.period);

            HandleResponse(true, 200, AdminResponses.ShowedCareFlowReport, { consultTime, triageTime, totalTime }, res);

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async listPatients(req: Request, res: Response) {
        try {
            const patients = await PatientManager.list();

            if (patients) {
                HandleResponse(true, 200, AdminResponses.ShowedPatients, patients, res);

            } else {
                HandleResponse(false, 400, AdminResponses.ShowPatientsFailed, null, res);
            }
    
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res)
        }
    },

    async searchPatient(req: Request<{}, {}, Patient['cpf']>, res: Response) {
        const patientData: Patient['cpf'] = req.body;

        try {
            const patient = await PatientManager.findByCpf(patientData);

            if (patient) {
                HandleResponse(true, 200, AdminResponses.PatientFounded, patient, res);
            } else {
                HandleResponse(false, 404, AdminResponses.PatientNotFound, null, res);
            }
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async createTriageCategory(req: Request<{}, {}, TriageCategory>, res: Response) {
        const newTriageCategory: TriageCategory = req.body;

        try {
            const result = await TriageCategoryManager.createCategory(newTriageCategory);

            if (result) {
                HandleResponse(true, 201, AdminResponses.TriageCategoryCreated, newTriageCategory, res);

            } else {
                HandleResponse(false, 400, AdminResponses.TriageCategoryCreateFailed, null, res);
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async updateTriageCategory(req: Request<{}, {}, UpdateTriageCategory>, res: Response) {
        const triageCategoryData: UpdateTriageCategory = req.body;

        try {
            const result = await TriageCategoryManager.updateCategory(triageCategoryData.name, triageCategoryData.limitMinutes);

            if (result) {
                HandleResponse(true, 200, AdminResponses.TriageCategoryUpdated, triageCategoryData, res);

            } else {
                HandleResponse(false, 400, AdminResponses.TriageCategoryUpdateFailed, null, res);
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async listTriageCategories(req: Request, res: Response) {
        try {
            const result = await TriageCategoryManager.listCategories();

            if (result) {
                HandleResponse(true, 200, AdminResponses.ShowedTriageCategories, result, res);
            } else {
                HandleResponse(false, 400, AdminResponses.TriageCateoriesFetchFailed, null, res);
            }
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async deleteTriageCategory(req: Request<Category>, res: Response) {
        const data = req.params;
        try {
            const result = await TriageCategoryManager.delete(data.triageCategory);

            if (result) {
                HandleResponse(true, 200, AdminResponses.DeletedCategory, result, res);
            } else {
                HandleResponse(false, 400, AdminResponses.DeleteCategoryFailed, null, res);
            }
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async recorver(req: Request, res: Response) {
        try {

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    }
}

const EmployersConstroller = {
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
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },

    async edit<T extends Employee | Nurse | Doctor>(req: Request<{}, {}, T>, res: Response) {
        const newData: T = req.body;

        try {
            await EmployeeManager.editEmployee(newData);
            HandleResponse(true, 200, AdminResponses.EmployeeEdited, newData, res);
        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },
    
    async delete<T extends Employee | Nurse | Doctor>(req: Request, res: Response) {
        const employee: T = req.body;
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
            console.error(error);
            HandleResponse(false, 500, ServerResponses.ServerError, null, res);
        }
    },

    async activateAccount(req: Request, res: Response) {
        const token = req.query.token as string;
        
        try {
            const data = Jwt.verifyRegisterToken(token);

            if (data) {
                HandleResponse(true, 200, "TESTE", data, res);
            }

        } catch (error) {
            console.error(error)
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
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    },

    async login(req: Request<{}, {}, User>, res: Response) {
        const loginDataReq: User = req.body;

        try {
            const logged = await Login.loginUser(loginDataReq);

            if (logged) {
                HandleResponse(true, 200, EmployeeResponses.EmployeeLoggedIn, logged, res);
            } else {
                HandleResponse(false, 400, 'Username or password invalid', null, res);
            }

        } catch (error) {
            console.error(error);
            HandleResponse(false, 500, error as string, null, res);
        }
    }
}

export { AdminController, EmployersConstroller };