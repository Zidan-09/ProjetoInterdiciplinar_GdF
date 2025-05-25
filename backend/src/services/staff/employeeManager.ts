import { Receptionist, Nurse, Doctor, Admin, User } from "../../entities/hospitalStaff";
import { ValidateRegister } from "../../utils/validators";
import { openDb } from "../../db";
import { Hash, Jwt } from "../../utils/security";
import { sendEmail } from "../../utils/email";

export type EmployeeType = 'Receptionist' | 'Nurse' | 'Doctor' | 'Admin';

export class EmployeeManager {
    static async registerEmployee<T extends Receptionist | Nurse | Doctor | Admin>(employeeData: T): Promise<[boolean, string]> {
        const valid = await ValidateRegister.verifyEmployee(employeeData);
        if (valid) {     

            const token: string = Jwt.generateToken(employeeData);
            sendEmail(employeeData.email, token);

            return [true, `Aguardando confirmação de cadastro de ${employeeData}`];
        } else {
            return [false, `${employeeData.name} já cadastrado(a) no sistema`];
        }
    }

    static async authAccount<T extends Receptionist | Nurse | Doctor | Admin>(data: any, userData: User) {
        const db = await openDb();

        const valid: boolean = await ValidateRegister.verifyEmployee(data.data);

        if (valid) {
            try {
                const employeeData: T = data.data;
    
                const employee: any = await db.run('INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [employeeData.registrationNumber, employeeData.name, employeeData.cpf, employeeData.email, employeeData.phone, employeeData.dob, employeeData.address, employeeData.hireDate, employeeData.workShift, employeeData.status, employeeData.salary, employeeData.cnesCode]);
                const employee_id = await employee.lastID;
                await db.run('INSERT INTO User (user_id, username, email, password) VALUES (?, ?, ?, ?)', [employee_id, userData.username, employeeData.email, await Hash.hash(userData.password)])
    
                if ('crm' in employeeData) {
                    await db.run('INSERT INTO Doctor (id, crm, specialty, weeklyHours, onDuty) VALUES (?, ?, ?, ?, ?)', [employee_id, employeeData.crm, employeeData.specialty, employeeData.weeklyHours, 0]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', ['doctor', employee_id])
                } else if ('coren' in employeeData) {          
                    await db.run('INSERT INTO Nurse (id, coren, department, speciality, weeklyHours, onDuty) VALUES (?, ?, ?, ?, ?, ?)', [employee_id, employeeData.coren, employeeData.department, employeeData.specialty, employeeData.weeklyHours, 0]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', ['nurse', employee_id])
                } else if ('accessLevel' in employeeData) {
                    await db.run('INSERT INTO Admin (id, accessLevel, weeklyHours) VALUES (?, ?, ?)', [employee_id, employeeData.accessLevel, employeeData.weeklyHours]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', ['admin', employee_id])
                } else {
                    await db.run('INSERT INTO Receptionist (id, weeklyHours) VALUES (?, ?)', [employee_id, employeeData.weeklyHours]);
                    await db.run('UPDATE User SET role = ? WHERE user_id = ?', ['receptionist', employee_id])
                };
            } catch (error) {
                console.error(error)
            }  
        } else {
            console.log('Cadastro em andamento, aguarde')
        }
    };
    
    static async editEmployee<T extends Receptionist | Nurse | Doctor | Admin>(newUserData: T) {
        const db = await openDb();

        const employee = await db.get('SELECT * FROM Employee WHERE registrationNumber = ? AND name = ? AND cpf = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf]);
        try {
            const employee_id = employee.id;

            if ('crm' in newUserData) {
                await db.run('UPDATE Doctor SET crm = ? AND speciality = ? AND weeklyHours = ? WHERE id = ?', [newUserData.crm, newUserData.specialty, newUserData.weeklyHours, employee_id]);
            } else if ('coren' in newUserData) {          
                await db.run('UPDATE Nurse SET coren = ? AND department = ? AND speciality = ? AND weeklyHours = ? WHERE id = ?', [newUserData.coren, newUserData.department, newUserData.specialty, newUserData.weeklyHours, employee_id]);
            } else if ('accessLevel' in newUserData) {
                await db.run('UPDATE Admin SET accessLevel = ? AND weeklyHours = ? WHERE id = ?', [newUserData.accessLevel, newUserData.weeklyHours, employee_id]);
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
            }[employeeType];
            return await db.all(`SELECT Employee.*, ${employeeType}.${extraFields} FROM ${employeeType} JOIN Employee ON ${employeeType}.id = Employee.id`);
        } catch (error) {
            console.error(error);
        }

    }
}