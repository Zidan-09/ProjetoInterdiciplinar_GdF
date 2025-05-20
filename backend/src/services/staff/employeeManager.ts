import { Receptionist, Nurse, Doctor, Admin } from "../../models/hospitalStaff";
import { ValidateRegister } from "../../utils/validators";
import { openDb } from "../../db";
// import { db } from "../db";

const db = openDb();

export type EmployeeType = 'Receptionist' | 'Nurse' | 'Doctor' | 'Admin';

export class EmployeeManager {
    static async registerEmployee<T extends Receptionist | Nurse | Doctor | Admin>(userData: T): Promise<[boolean, string]> {
        const valid = await ValidateRegister.verifyEmployee(userData);
        if (valid) {
            (await db).run('INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userData.registrationNumber, userData.name, userData.cpf, userData.email, userData.phone, userData.dob, userData.address, userData.hireDate, userData.workShift, userData.status, userData.salary, userData.cnesCode]);

            if ('crm' in userData) {
                (await db).run('INSERT INTO Doctor (crm, speciality, weeklyHours) VALUE (?, ?, ?)', [userData.crm, userData.specialty, userData.weeklyHours]);
            } else if ('coren' in userData) {
                (await db).run('INSERT INTO Nurse (coren, department, speciality, weeklyHours) VALUES (?, ?, ?, ?)', [userData.coren, userData.department, userData.specialty, userData.weeklyHours]);
            } else if ('accessLevel' in userData) {
                (await db).run('INSERT INTO Admin (accessLevel, weeklyHours) VALUE (?, ?)', [userData.accessLevel, userData.weeklyHours]);
            } else {
                (await db).run('INSERT INTO Receptionist (weeklyHours) VALUE (?)', [userData.weeklyHours]);
            }
            return [true, `${userData.name} cadastrado(a) com sucesso!`];
        } else {
            return [false, `${userData.name} já cadastrado(a)`];
        }
    }
    
      static async editEmployee(newUserData: Receptionist | Nurse | Doctor | Admin) {
        if ('crm' in newUserData) {
            // return await db.query('UPDATE Doctor SET ... WHERE id = ?', [id]); MySQL
        } else if ('coren' in newUserData) {
            // return await db.query('UPDATE Nurse SET ... WHERE id = ?', [id]); MySQL
        } else if ('accessLevel' in newUserData) {
            // return await db.query('UPDATE Admin SET ... WHERE id = ?', [id]); MySQL
        } else {
            // return await db.query('UPDATE Recetcionist SET ... WHERE id = ?', [id]); MySQL
        }
    }
    
    static async showEmployeers(employeeType: EmployeeType) {
        const tableMap = {
          Receptionist: "Receptionist",
          Nurse: "Nurse",
          Doctor: "Doctor",
          Admin: "Admin"
        };
        const tableName = tableMap[employeeType];
        return (await db).all(`SELECT * FROM ${tableName}`);
        // return await db.query(`SELECT * FROM ${tableName}`); MySQL
    }
}