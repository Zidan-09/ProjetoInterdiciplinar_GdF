import { Receptionist, Nurse, Doctor, Admin, ConfirmUser, LoginData } from "../../entities/hospitalStaff";
import { EmployeeManager } from "../../services/adm/employeeManager";
import { EmployeeType } from "../../utils/personsUtils/generalEnuns";
import { Login } from "../../services/adm/employeeLogin";
import { Jwt } from "../../utils/systemUtils/security";
import { showCareFlows } from "../../services/adm/showCareFlows";
import { HandleResponseTest } from "./handleResponseTest";
import { EmployeeResponseMessage } from "../../utils/personsUtils/generalEnuns";

type Params = { employee: EmployeeType }

class AdminControllerTest {
    static async listCareFlows() {
        try {
            const careFlows = await showCareFlows();
            HandleResponseTest(true, 200, 'CareFlows showed', careFlows);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    };
}

class EmployersConstrollerTest {
    static async register<T extends Receptionist | Nurse | Doctor | Admin>(request: T) {
        const data: T = request;

        try {
            const done: EmployeeResponseMessage = await EmployeeManager.registerEmployee(data);

            if (done === EmployeeResponseMessage.AwaitingConfirmation) {
                HandleResponseTest(true, 200, done, data);
            } else {
                HandleResponseTest(false, 400, done, data);
            }

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    };

    static async edit<T extends Receptionist | Nurse | Doctor | Admin>(request: T) {
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
            HandleResponseTest(false, 500, EmployeeResponseMessage.Error, null);
        }
    };

    static async activateAccount(query: string) {
        const token = query;
        
        try {
            const data = Jwt.verifyToken(token);

            if (data) {
                HandleResponseTest(true, 200, "TESTE", data);
            }

        } catch (error) {
            console.error(error)
        }
    }

    static async authAccount(request: ConfirmUser<Receptionist | Nurse | Doctor | Admin>) {
        const { data, user } = request;

        try {
            const done: EmployeeResponseMessage = await EmployeeManager.authAccount(data, user);

            if (done === EmployeeResponseMessage.Error || done === EmployeeResponseMessage.RegistrationInProgress) {
                HandleResponseTest(false, 400, done, null);
            } else {
                HandleResponseTest(true, 200, done, { data, user });
            }
            
        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    }

    static async login(request: LoginData) {
        const loginDataReq: LoginData = request;

        try {
            await Login.loginUser(loginDataReq);
            HandleResponseTest(true, 200, EmployeeResponseMessage.EmployeeLoggedIn, loginDataReq);

        } catch (error) {
            console.error(error);
            HandleResponseTest(false, 500, error as string, null);
        }
    };
}

export { AdminControllerTest, EmployersConstrollerTest };