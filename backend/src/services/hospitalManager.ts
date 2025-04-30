import { RecepcionistData, NurseData, DoctorData, CriteriaData } from "../models/interfaces";
import { criteria } from "../models/criteria";

export class HospitalManager {
    static changeCriteria(newCriteria: CriteriaData) {
        criteria.immediate = newCriteria.immediate;
        criteria.veryUrgent = newCriteria.veryUrgent;
        criteria.urgent = newCriteria.urgent;
        criteria.lowUrgency = newCriteria.lowUrgency;
        criteria.nonUrgent = newCriteria.nonUrgent;
    }

    static showRelatories(period: Date) {

    }

    static registerUser(user: RecepcionistData | NurseData | DoctorData): Boolean {
        return true;
    }

    static editUser(user: RecepcionistData | NurseData | DoctorData) {

    }

    static deleteUser(user: RecepcionistData | NurseData | DoctorData) {

    }
}