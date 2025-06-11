import { Employee, Nurse, Doctor, ConfirmUser, User } from "../../entities/hospitalStaff";
import { EmployeeManager } from "../../services/adm/employeeManager";
import { EmployeeType } from "../../utils/enuns/generalEnuns";
import { Login } from "../../services/adm/employeeLogin";
import { Jwt } from "../../utils/systemUtils/security";
import { HandleResponseTest } from "./handleResponseTest";
import { CareFlowReports } from "../../services/adm/reports/careFlowReports";
import { PatientManager } from "../../services/hospital/patientManager";
import { EmployeeResponses, AdminResponses, ServerResponses } from "../../utils/enuns/allResponses";

type Params = { employee: EmployeeType }

class AdminControllerTest {
    static async listCareFlows() {
        try {
            const careFlows = await CareFlowReports.showAllCareFlows();
            HandleResponseTest(true, 200, AdminResponses.ShowedCareFlows, careFlows);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, ServerResponses.ServerError, null);
        }
    };

    static async listPatients() {
        try {
            const patients = await PatientManager.list();
            HandleResponseTest(true, 200, AdminResponses.ShowedPatients, patients);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, ServerResponses.ServerError, null);
        }
    }
}

class EmployersConstrollerTest {
    static async register<T extends Employee | Nurse | Doctor>(request: T) {
        const data: T = request;

        try {
            const done: EmployeeResponses = await EmployeeManager.registerEmployee(data);

            if (done === EmployeeResponses.AwaitingConfirmation) {
                HandleResponseTest(true, 200, done, data);
            } else {
                HandleResponseTest(false, 400, done, data);
            }

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, ServerResponses.ServerError, null);
        }
    };

    static async edit<T extends Employee | Nurse | Doctor>(request: T) {
        const newData: T = request;

        try {
            const done = await EmployeeManager.editEmployee(newData);
            HandleResponseTest(true, 200, "Editado", newData);
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    };

    static async showEmployeers(request: Params) {
        const { employee } = request;

        try {
            const employeers = await EmployeeManager.showEmployeers(employee)
            HandleResponseTest(true, 200, "cadastrados", employeers);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, EmployeeResponses.Error, null);
        }
    };

    static async activateAccount(query: string) {
        const token = query;
        
        try {
            const data = Jwt.verifyRegisterToken(token);

            if (data) {
                HandleResponseTest(true, 200, "TESTE", data);
            }

        } catch (error) {
            console.error(error)
        }
    }

    static async authAccount(request: ConfirmUser<Employee | Nurse | Doctor>) {
        const { data, user } = request;

        try {
            const done: EmployeeResponses = await EmployeeManager.authAccount(data, user);

            if (done === EmployeeResponses.Error || done === EmployeeResponses.RegistrationInProgress) {
                HandleResponseTest(false, 400, done, null);
            } else {
                HandleResponseTest(true, 200, done, { data, user });
            }
            
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    }

    static async login(request: User) {
        const loginDataReq: User = request;

        try {
            await Login.loginUser(loginDataReq);
            HandleResponseTest(true, 200, EmployeeResponses.EmployeeLoggedIn, loginDataReq);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    };
}

export { AdminControllerTest, EmployersConstrollerTest };