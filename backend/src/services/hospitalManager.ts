import { Administrator, Doctor, Nurse, Recepcionist } from "../models/hospitalStaff";
import { CriteriaData } from "../utils/convertJson";
import { RecepcionistData, NurseData, DoctorData } from "../utils/convertJson";

export class HospitalManager {
    static changeTriageCriteria(criteria: CriteriaData) {

    }

    static showRelatories(period: Date) {

    }

    static registerUser(user: RecepcionistData | NurseData | DoctorData): Recepcionist | Nurse | Doctor {
        if ('crm' in user) {
            const doctor: Doctor = new Doctor(user.name, user.cpf, user.contacts, user.registrationNumber, user.hireDate, user.shift, user.salary, user.cnesCode, user.crm, user.specialty, user.weeklyHours);
            return doctor;
        } else if ('coren' in user) {
            const nurse: Nurse = new Nurse(user.name, user.cpf, user.contacts, user.registrationNumber, user.hireDate, user.shift, user.salary, user.cnesCode, user.coren, user.department, user.roleType, user.weeklyHours);
            return nurse;
        } else {
            const recepcionist: Recepcionist = new Recepcionist(user.name, user.cpf, user.contacts, user.registrationNumber, user.hireDate, user.shift, user.salary, user.cnesCode, user.weeaklyHours);
            return recepcionist;
        }
    }

    static editUser(user: RecepcionistData | NurseData | DoctorData) {

    }

    static deleteUser(user: Doctor | Nurse | Recepcionist | Administrator) {

    }
}