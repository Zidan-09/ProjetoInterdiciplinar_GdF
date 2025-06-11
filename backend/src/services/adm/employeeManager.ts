import { Employee, Nurse, Doctor, User } from "../../entities/hospitalStaff";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { openDb } from "../../db";
import { Hash, Jwt } from "../../utils/systemUtils/security"
import { sendEmail } from "../../utils/personsUtils/email";
import { EmployeeType, EmployeeResponseMessage } from "../../utils/personsUtils/generalEnuns";
import { AdminResponses } from "../../utils/systemUtils/AdminResponses";

export class EmployeeManager {
    static async registerEmployee<T extends Employee | Nurse | Doctor>(employeeData: T): Promise<EmployeeResponseMessage> {
        const valid = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {     
            const token: string = Jwt.generateRegisterToken(employeeData);
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
                const employee: any = await db.run("INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode, weeklyHours, accessLevel) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?)", [employeeData.registrationNumber, employeeData.name, employeeData.cpf, employeeData.email, employeeData.phone, employeeData.dob, employeeData.address, employeeData.workShift, employeeData.status, employeeData.salary, employeeData.cnesCode, employeeData.weeklyHours, employeeData.accessLevel]);
                const employee_id = await employee.lastID;
                await db.run('INSERT INTO User (user_id, username, password) VALUES (?, ?, ?)', [employee_id, userData.username, await Hash.hash(userData.password)])
                
                switch (employeeData.accessLevel) {
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
    
    static async editEmployee<T extends Employee | Nurse | Doctor>(newUserData: T): Promise<AdminResponses|void> {
        const db = await openDb();

        const employee = await db.get('SELECT * FROM Employee WHERE registrationNumber = ? AND name = ? AND cpf = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf]);
        try {
            const employee_id = employee.id;
            await db.run('UPDATE Employee SET registrationNumber = ?, name = ?, cpf = ?, email = ?, phone = ?, dob = ?, address = ?, hireDate = ?, workShift = ?, status = ?, salary = ?, cnesCode = ?, weeklyHours = ?, accessLevel = ? WHERE id = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf, newUserData.email, newUserData.phone, newUserData.dob, newUserData.address, newUserData.workShift, newUserData.status, newUserData.salary, newUserData.cnesCode, newUserData.weeklyHours, newUserData.accessLevel, employee_id]);

            switch (newUserData.accessLevel) {
                case EmployeeType.Doctor:
                    const doctorData = newUserData as Doctor;
                    await db.run('UPDATE Doctor SET crm = ?, specialty = ? WHERE id = ?', [doctorData.crm, doctorData.specialty, employee_id]);
                    break;
                case EmployeeType.Nurse:
                    const nurseData = newUserData as Nurse;
                    await db.run('UPDATE Nurse SET coren = ?, department = ?, specialty = ? WHERE id = ?', [nurseData.coren, nurseData.department, nurseData.specialty, employee_id]);
                    break;
            }
            return AdminResponses.EmployeeEdited;

        } catch (error) {
            console.error(error)
        } 
    }
    
    static async showEmployeers(employeeType: EmployeeType): Promise<any[]|void> {
        const db = await openDb();
        const employee: string = employeeType[0].toLowerCase() + employeeType.slice(1);

        try {
            if (employee === EmployeeType.Receptionist || employee === EmployeeType.Admin) {
                const employers = await db.all('SELECT * FROM Employee WHERE accessLevel = ?', [employee]);
                console.log(employers)
                return employers;
                
            } else {
                const employee: string = employeeType[0].toUpperCase() + employeeType.slice(1);
                const employers = await db.all(`SELECT Employee.*, ${employee}.* FROM ${employee} JOIN Employee ON Employee.id = ${employee}.id`);
                return employers;
            }

        } catch (error) {
            console.error(error);
        }
    }
}