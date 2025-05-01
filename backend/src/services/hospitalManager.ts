import { RecepcionistData, NurseData, DoctorData, CriteriaData, AdminData } from "../models/interfaces";
import { criteria } from "../models/criteria";
import { admins, doctors, nurses, prisma, recepcionists } from "../prismaTests";

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

    static async registerUser(userData: RecepcionistData | NurseData | DoctorData | AdminData): Promise<boolean> {
        const data: RecepcionistData | NurseData | DoctorData | AdminData = userData;

        if ("crm" in data) {
            const doctor: boolean = await prisma.doctor.create({
                data: {
                    registrationNumber: data.registrationNumber,
                    name: data.name,
                    cpf: data.cpf,
                    contacts: data.contacts,
                    shift: data.shift,
                    salary: data.salary,
                    cnesCode: data.cnesCode,
                    crm: data.crm,
                    speciality: data.specialty,
                    weeklyHours: data.weeklyHours,
                    onDuty: data.onDuty
                }
            });
            doctors.push(doctor)
            return doctor;
        } else if ("coren" in data) {
            const nurse: boolean = await prisma.nurse.create({
                data: {
                    registrationNumber: data.registrationNumber,
                    name: data.name,
                    cpf: data.cpf,
                    contacts: data.contacts,
                    shift: data.shift,
                    salary: data.salary,
                    cnesCode: data.cnesCode,
                    coren: data.coren,
                    department: data.department,
                    roleType: data.roleType,
                    weeklyHours: data.weeklyHours,
                    onDuty: data.onDuty
                }
            })
            nurses.push(nurse)
            return nurse;
        } else if ("weeklyHours" in data) {
            const recepcionist = await prisma.recepcionist.create({
                data: {
                    registrationNumber: data.registrationNumber,
                    name: data.name,
                    cpf: data.cpf,
                    contacts: data.contacts,
                    shift: data.shift,
                    salary: data.salary,
                    cnesCode: data.cnesCode,
                    weeklyHours: data.weeklyHours
            }
            })
            recepcionists.push(recepcionist);
            return recepcionist
        } else {
            const admin = await prisma.admin.create({
                data: {
                    registrationNumber: data.registrationNumber,
                    name: data.name,
                    cpf: data.cpf,
                    contacts: data.contacts,
                    shift: data.shift,
                    salary: data.salary,
                    cnesCode: data.cnesCode
                }
            })
            admins.push(admin)
            return admin
        }
    }

    static editUser(user: RecepcionistData | NurseData | DoctorData | AdminData) {

    }

    static deleteUser(user: RecepcionistData | NurseData | DoctorData | AdminData) {

    }
}