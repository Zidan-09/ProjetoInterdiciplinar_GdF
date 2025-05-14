import { Recepcionist, Nurse, Doctor, Admin } from "../../models/hospitalStaff";
import { ValidateRegister } from "../../utils/validators";
import { openDb } from "../../db";
// import { db } from "../db";

const db = openDb();

export type EmployeeType = 'Recepcionist' | 'Nurse' | 'Doctor' | 'Admin';

export class EmployeeManager {
    static async registerEmployee<T extends Recepcionist | Nurse | Doctor | Admin>(userData: T): Promise<[boolean, string]> {
        const isValid = await ValidateRegister.verifyEmployee(userData);
        if (isValid) {
            // await db.execute('INSERT INTO ...', []); MySQL
            await (await db).run('');
            return [true, `${userData.name} cadastrado(a) com sucesso!`];
        } else {
            return [false, `${userData.name} já cadastrado(a)`];
        }
    }
    
      static async editEmployee(id: number, newUserData: Recepcionist | Nurse | Doctor | Admin) {
        if ('crm' in newUserData) {
            // return await db.query('UPDATE Doctor SET ... WHERE id = ?', [id]); MySQL
        } else if ('coren' in newUserData) {
            // return await db.query('UPDATE Nurse SET ... WHERE id = ?', [id]); MySQL
        } else if ('accessLevel' in newUserData) {
            // return await db.query('UPDATE Admin SET ... WHERE id = ?', [id]); MySQL
        } else {
            // return await db.query('UPDATE Recepcionist SET ... WHERE id = ?', [id]); MySQL
        }
    }
    
    static async showEmployeers(employeeType: EmployeeType) {
        const tableMap = {
          Recepcionist: "Recepcionist",
          Nurse: "Nurse",
          Doctor: "Doctor",
          Admin: "Admin"
        };
        const tableName = tableMap[employeeType];
        // return await db.query(`SELECT * FROM ${tableName}`); MySQL
    }
}