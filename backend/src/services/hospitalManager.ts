import { Recepcionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";
import { criteria, CriteriaData } from "../models/criteria";
import { ValidateRegister } from "../utils/validators";
import { db } from "../db";

export type EmployeeType = 'Recepcionist' | 'Nurse' | 'Doctor' | 'Admin';

export class HospitalManager {
    static async changeCriteria(newCriteria: CriteriaData): Promise<string> {
        criteria.immediate = newCriteria.immediate;
        criteria.veryUrgent = newCriteria.veryUrgent;
        criteria.urgent = newCriteria.urgent;
        criteria.standard = newCriteria.standard;
        criteria.nonUrgent = newCriteria.nonUrgent;

        return 'Alteração Feita com Sucesso!'
    }

    static async registerEmployee<T extends Recepcionist | Nurse | Doctor | Admin>(userData: T): Promise<[boolean, string]> {
        const isValid = await ValidateRegister.verifyEmployee(userData);
        if (isValid) {
            await db.execute('INSERT INTO ...', []);
            return [true, `${userData.name} cadastrado(a) com sucesso!`];
        } else {
            return [false, `${userData.name} já cadastrado(a)`];
        }
    }
    
      static async editEmployee(id: number, newUserData: Recepcionist | Nurse | Doctor | Admin) {
        if ('crm' in newUserData) {
            return await db.query('UPDATE Doctor SET ... WHERE id = ?', [id]);
        } else if ('coren' in newUserData) {
            return await db.query('UPDATE Nurse SET ... WHERE id = ?', [id]);
        } else if ('accessLevel' in newUserData) {
            return await db.query('UPDATE Admin SET ... WHERE id = ?', [id]);
        } else {
            return await db.query('UPDATE Recepcionist SET ... WHERE id = ?', [id]);
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
        return await db.query(`SELECT * FROM ${tableName}`);
    }
}