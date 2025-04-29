import { Doctor, Nurse, Recepcionist } from '../models/hospitalStaff';
import { Patient } from '../models/patient';
import {Triage, Consult, Attend} from '../models/careFlow';
import { DataBase } from '../simulateBD/Bd';

export class Convert {
    static JsonToPatient(json: any): Patient {
        const patient: Patient = new Patient(json.name, json.dob, json.MaritalStatus, json.cpf, json.rg, json.contacts, json.Gender, json.healthPlan, json.adrress);
        return patient;
    };

    static JsonToAttend(json: any): Attend {
    const recepcionist: Recepcionist = DataBase.searchRecepcionist(json.id_recepcionist);
        const attend: Attend = new Attend(json.ticket, recepcionist);
        return attend;
    }
    static JsonToTriage(json: any): Triage {
        const triage: Triage = new Triage(json.nurse, json.vitalSigns, json.severity, json.simptoms, json.painLevel);
        return triage;
    };

    static JsonToRecepcionist(json: any): Recepcionist {
        const  recepcionist: Recepcionist = new Recepcionist(json.name, json.cpf, json.contacts, json.registrationNumber, json.hireDate, json.shift, json.salary, json.cnesCode,json.weeaklyHours);
        return recepcionist;
    };

    static JsonToNurse(json: any): Nurse {
        const nurse: Nurse = new Nurse(json.name, json.cpf, json.contacts, json.registrationNumber, json.hireDate, json.shift, json.salary, json.cnesCode, json.coren, json.department, json.roleType, json.weeaklyHours);
        return nurse;
    };

    static JsonToDoctor(json: any): Doctor {
        const doctor: Doctor = new Doctor(json.name, json.cpf, json.contacts, json.registrationNumber, json.hireDate, json.shift, json.salary, json.cnesCode, json.crm, json.speciality, json.weeaklyHours);
        return doctor;
    };
}   