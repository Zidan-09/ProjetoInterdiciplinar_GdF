import { Recepcionist, Nurse, Doctor, Admin } from "../models/hospitalStaff";
import { criteria, CriteriaData } from "../models/criteria";

export class HospitalManager {
    static async changeCriteria(newCriteria: CriteriaData): Promise<string> {
        criteria.immediate = newCriteria.immediate;
        criteria.veryUrgent = newCriteria.veryUrgent;
        criteria.urgent = newCriteria.urgent;
        criteria.standard = newCriteria.standard;
        criteria.nonUrgent = newCriteria.nonUrgent;

        return 'Alteração Feita com Sucesso!'
    }

    static async showRelatories(period: Date) {

    }

    static async registerEmployee(userData: Recepcionist | Nurse | Doctor | Admin) {
        return true
    }
}