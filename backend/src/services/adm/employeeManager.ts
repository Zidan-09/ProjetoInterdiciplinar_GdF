import { Employee, Nurse, Doctor, User } from "../../entities/hospitalStaff";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { openDb } from "../../db";
import { Hash, Jwt } from "../../utils/systemUtils/security"
import { sendEmail } from "../../utils/personsUtils/email";
import { EmployeeType, EmployeeResponseMessage } from "../../utils/personsUtils/generalEnuns";

export class EmployeeManager {
    static async registerEmployee<T extends Employee | Nurse | Doctor>(employeeData: T): Promise<EmployeeResponseMessage> {
        const valid = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {     
            const token: string = Jwt.generateToken(employeeData);
            sendEmail(employeeData.email, token);

            return EmployeeResponseMessage.AwaitingConfirmation;

        } else {
            return EmployeeResponseMessage.AlreadyRegistered;
        }
    }

    static async authAccount<T extends Employee | Nurse | Doctor>(data: any, userData: User): Promise<EmployeeResponseMessage> {
        const employeeData: T = data;
        const db = await openDb();

        const valid: boolean = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {
            try {
                const employee: any = await db.run("INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode, weeklyHours, accessLevel, role) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?, ?)", [employeeData.registrationNumber, employeeData.name, employeeData.cpf, employeeData.email, employeeData.phone, employeeData.dob, employeeData.address, employeeData.workShift, employeeData.status, employeeData.salary, employeeData.cnesCode, employeeData.weeklyHours, employeeData.accessLevel, employeeData.role]);
                const employee_id = await employee.lastID;
                await db.run('INSERT INTO User (user_id, username, password) VALUES (?, ?, ?)', [employee_id, userData.username, await Hash.hash(userData.password)])
                
                switch (employeeData.role) {
                    case EmployeeType.Doctor:
                        const doctorData = employeeData as Doctor;
                        await db.run('INSERT INTO Doctor (id, crm, specialty, onDuty) VALUES (?, ?, ?, ?)', [employee_id, doctorData.crm, doctorData.specialty, 0]);
                        break;

                    case EmployeeType.Nurse:
                        const nurseData = employeeData as Nurse;
                        await db.run('INSERT INTO Nurse (id, coren, department, speciality, onDuty) VALUES (?, ?, ?, ?, ?)', [employee_id, nurseData.coren, nurseData.department, nurseData.specialty, 0]);
                        break;
                }

                return EmployeeResponseMessage.EmployeeRegistered;

            } catch (error) {
                console.error(error)
                return EmployeeResponseMessage.Error
            }  
        } else {
            return EmployeeResponseMessage.RegistrationInProgress
        }
    };
    
    static async editEmployee<T extends Employee | Nurse | Doctor>(newUserData: T) {
        const db = await openDb();

        const employee = await db.get('SELECT * FROM Employee WHERE registrationNumber = ? AND name = ? AND cpf = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf]);
        try {
            const employee_id = employee.id;

            
        } catch (error) {
            console.error(error)
        } 
    }
    
    static async showEmployeers(employeeType: EmployeeType) {
        const db = await openDb();

        try {
            const extraFields = {
              Receptionist: "weeklyHours",
              Nurse: "coren, department, speciality, weeklyHours, onDuty",
              Doctor: "crm, specialty, weeklyHours, onDuty",
              Admin: "accessLevel, weeklyHours"
            };

            return await db.all(`SELECT Employee.*, ${employeeType}.* FROM ${employeeType} JOIN Employee ON ${employeeType}.id = Employee.id`);
        } catch (error) {
            console.error(error);
        }
    }
}