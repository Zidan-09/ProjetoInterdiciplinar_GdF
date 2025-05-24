import { Receptionist, Nurse, Doctor, Admin } from "../../models/hospitalStaff";
import { ValidateRegister } from "../../utils/validators";
import { openDb } from "../../db";
import { Jwt } from "../../utils/security";
import { sendEmail } from "../../utils/email";


export type EmployeeType = 'Receptionist' | 'Nurse' | 'Doctor' | 'Admin';

export class EmployeeManager {
    static async registerEmployee<T extends Receptionist | Nurse | Doctor | Admin>(userData: T): Promise<[boolean, string]> {
        const db = await openDb();
        const valid = await ValidateRegister.verifyEmployee(userData);
        if (valid) {
            const employee: any = await db.run('INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userData.registrationNumber, userData.name, userData.cpf, userData.email, userData.phone, userData.dob, userData.address, userData.hireDate, userData.workShift, userData.status, userData.salary, userData.cnesCode]);
            const employee_id = await employee.lastID;

            if ('crm' in userData) {
                await db.run('INSERT INTO Doctor (id, crm, specialty, weeklyHours, onDuty) VALUES (?, ?, ?, ?, ?)', [employee_id, userData.crm, userData.specialty, userData.weeklyHours, 0]);
            } else if ('coren' in userData) {          
                await db.run('INSERT INTO Nurse (id, coren, department, speciality, weeklyHours, onDuty) VALUES (?, ?, ?, ?, ?, ?)', [employee_id, userData.coren, userData.department, userData.specialty, userData.weeklyHours, 0]);
            } else if ('accessLevel' in userData) {
                await db.run('INSERT INTO Admin (id, accessLevel, weeklyHours) VALUES (?, ?, ?)', [employee_id, userData.accessLevel, userData.weeklyHours]);
            } else {
                await db.run('INSERT INTO Receptionist (id, weeklyHours) VALUES (?, ?)', [employee_id, userData.weeklyHours]);
            };             

            const token: string = Jwt.generateToken({id: employee_id});
            sendEmail(userData.email, token);

            return [true, `${userData.name} cadastrado(a) com sucesso! Aguardando confirmação`];
        } else {
            return [false, `${userData.name} já cadastrado(a)`];
        }
    }
    
    static async editEmployee<T extends Receptionist | Nurse | Doctor | Admin>(newUserData: T) {
        const db = await openDb();

        const employee = await db.get('SELECT * FROM Employee WHERE registrationNumber = ? AND name = ? AND cpf = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf]);
        try {
            const employee_id = employee.id;

            if ('crm' in newUserData) {
                await db.run('UPDATE Doctor SET crm = ? AND speciality = ? AND weeklyHours = ? WHERE doctor_id = ?', [newUserData.crm, newUserData.specialty, newUserData.weeklyHours, employee_id]);
            } else if ('coren' in newUserData) {          
                await db.run('UPDATE Nurse SET coren = ? AND department = ? AND speciality = ? AND weeklyHours = ? WHERE nurse_id = ?', [newUserData.coren, newUserData.department, newUserData.specialty, newUserData.weeklyHours, employee_id]);
            } else if ('accessLevel' in newUserData) {
                await db.run('UPDATE Admin SET accessLevel = ? AND weeklyHours = ? WHERE admin_id = ?', [newUserData.accessLevel, newUserData.weeklyHours, employee_id]);
            } else {
                await db.run('UPDATE Receptionist SET weeklyHours = ? WHERE receptionist_id = ?', [newUserData.weeklyHours, employee_id]);
            };
        } catch (error) {
            console.error(error)
        } 
    }
    
    static async showEmployeers(employeeType: EmployeeType) {
        const db = await openDb();

        const extraFields = {
          Receptionist: "weeklyHours",
          Nurse: "coren, department, speciality, weeklyHours, onDuty",
          Doctor: "crm, specialty, weeklyHours, onDuty",
          Admin: "accessLevel, weeklyHours"
        }[employeeType];

        return await db.all(`SELECT Employee.*, ${employeeType}.${extraFields} FROM ${employeeType} JOIN Employee ON ${employeeType}.id = Employee.id`);
    }
}