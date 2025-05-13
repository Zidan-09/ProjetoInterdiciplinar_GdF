import { Recepcionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";
import { criteria, CriteriaData } from "../models/criteria";
import { ValidateRegister } from "../utils/validators";
import { db } from "../db";

export class HospitalManager {
    static async changeCriteria(newCriteria: CriteriaData): Promise<string> {
        criteria.immediate = newCriteria.immediate;
        criteria.veryUrgent = newCriteria.veryUrgent;
        criteria.urgent = newCriteria.urgent;
        criteria.standard = newCriteria.standard;
        criteria.nonUrgent = newCriteria.nonUrgent;

        return 'Alteração Feita com Sucesso!'
    }

    static async showReports(period: Date) {

    }

    static async registerEmployee(userData: Recepcionist | Nurse | Doctor | Admin): Promise<[boolean, string]> {
        const isValid: boolean = await ValidateRegister.verifyEmployee(userData);
        if (isValid) {
            db.execute('', [])
            return [true, 'Empregado cadastrado com sucesso!']
        } else {
            return [false, 'Empregado já cadastrado']
        }
    }

    static async editEmployee(id: number, newUserData: Recepcionist | Nurse | Doctor | Admin) {
        if ('crm' in newUserData) {
            db.query('SELECT * FROM Doctor');
        } else if ('coren' in newUserData) {
            db.query('SELECT * FROM Nurse');
        } else if ('accessLevel' in newUserData) {
            db.query('SELECT * FROM Admin');
        } else {
            db.query('SELECT * FROM Recepcionist')
        }
    }
}