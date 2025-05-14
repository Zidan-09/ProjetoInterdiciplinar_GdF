import { criteria, CriteriaData } from "../../models/criteria";
import { openDb } from "../../db";
// import { db } from "../db";

const db = openDb();

export class CriteriaManager {
    static async changeCriteria(newCriteria: CriteriaData): Promise<string> {
        criteria.immediate = newCriteria.immediate;
        criteria.veryUrgent = newCriteria.veryUrgent;
        criteria.urgent = newCriteria.urgent;
        criteria.standard = newCriteria.standard;
        criteria.nonUrgent = newCriteria.nonUrgent;

        return 'Alteração Feita com Sucesso!'
    }
}