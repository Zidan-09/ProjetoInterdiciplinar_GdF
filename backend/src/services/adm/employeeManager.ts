import { Receptionist, Nurse, Doctor, Admin, User } from "../../entities/hospitalStaff";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { openDb } from "../../db";
import { Hash, Jwt } from "../../utils/systemUtils/security"
import { sendEmail } from "../../utils/personsUtils/email";
import { EmployeeType, EmployeeResponseMessage } from "../../utils/personsUtils/generalEnuns";

export class EmployeeManager {
    static async registerEmployee<T extends Receptionist | Nurse | Doctor | Admin>(employeeData: T): Promise<EmployeeResponseMessage> {
        const valid = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {     
            const token: string = Jwt.generateToken(employeeData);
            sendEmail(employeeData.email, token);

            return EmployeeResponseMessage.AwaitingConfirmation;

        } else {
            return EmployeeResponseMessage.AlreadyRegistered;
        }
    }

    static async authAccount<T extends Receptionist | Nurse | Doctor | Admin>(data: any, userData: User): Promise<EmployeeResponseMessage> {
        const employeeData: T = data;
        const db = await openDb();

        const valid: boolean = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {
            try {
                const employee: any = await db.run("INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?)", [employeeData.registrationNumber, employeeData.name, employeeData.cpf, employeeData.email, employeeData.phone, employeeData.dob, employeeData.address, employeeData.workShift, employeeData.status, employeeData.salary, employeeData.cnesCode]);
                const employee_id = await employee.lastID;
                await db.run('INSERT INTO User (user_id, username, email, password) VALUES (?, ?, ?, ?)', [employee_id, userData.username, employeeData.email, await Hash.hash(userData.password)])
    
                if ('crm' in employeeData) {
                    await db.run('INSERT INTO Doctor (id, crm, specialty, weeklyHours, onDuty) VALUES (?, ?, ?, ?, ?)', [employee_id, employeeData.crm, employeeData.specialty, employeeData.weeklyHours, 0]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', [EmployeeType.Doctor, employee_id])
                } else if ('coren' in employeeData) {          
                    await db.run('INSERT INTO Nurse (id, coren, department, speciality, weeklyHours, onDuty) VALUES (?, ?, ?, ?, ?, ?)', [employee_id, employeeData.coren, employeeData.department, employeeData.specialty, employeeData.weeklyHours, 0]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', [EmployeeType.Nurse, employee_id])
                } else if ('accessLevel' in employeeData) {
                    await db.run('INSERT INTO Admin (id, accessLevel, weeklyHours) VALUES (?, ?, ?)', [employee_id, employeeData.accessLevel, employeeData.weeklyHours]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', [EmployeeType.Admin, employee_id])
                } else {
                    await db.run('INSERT INTO Receptionist (id, weeklyHours) VALUES (?, ?)', [employee_id, employeeData.weeklyHours]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', [EmployeeType.Receptionist, employee_id])
                };

                return EmployeeResponseMessage.EmployeeRegistered;

            } catch (error) {
                console.error(error)
                return EmployeeResponseMessage.Error
            }  
        } else {
            return EmployeeResponseMessage.RegistrationInProgress
        }
    };
    
    static async editEmployee<T extends Receptionist | Nurse | Doctor | Admin>(newUserData: T) {
        const db = await openDb();

        const employee = await db.get('SELECT * FROM Employee WHERE registrationNumber = ? AND name = ? AND cpf = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf]);
        try {
            const employee_id = employee.id;

            if ('crm' in newUserData) {
                await db.run('UPDATE Doctor SET crm = ?, speciality = ?, weeklyHours = ? WHERE id = ?', [newUserData.crm, newUserData.specialty, newUserData.weeklyHours, employee_id]);
            } else if ('coren' in newUserData) {          
                await db.run('UPDATE Nurse SET coren = ?, department = ?, speciality = ?, weeklyHours = ? WHERE id = ?', [newUserData.coren, newUserData.department, newUserData.specialty, newUserData.weeklyHours, employee_id]);
            } else if ('accessLevel' in newUserData) {
                await db.run('UPDATE Admin SET accessLevel = ?, weeklyHours = ? WHERE id = ?', [newUserData.accessLevel, newUserData.weeklyHours, employee_id]);
            } else {
                await db.run('UPDATE Receptionist SET weeklyHours = ? WHERE id = ?', [newUserData.weeklyHours, employee_id]);
            };
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