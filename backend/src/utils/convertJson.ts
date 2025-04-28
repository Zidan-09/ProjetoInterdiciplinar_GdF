import { MaritalStatus, Gender} from '../models/patient';
import { Severity } from '../models/triage';

export interface PatientData {
    id: number;
    name: string;
    dob: Date;
    maritalStatus: MaritalStatus;
    cpf: string;
    rg: string;
    contact: string[];
    gender: Gender;
    healthPlan: string;
    address: string;
}

export interface TriageData {
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: number,
            diastolicPreassure: number,
        },
        heartRate: number,
        respiratoryRate: number,
        bodyTemperature: number,
        oxygenSaturation: number
    };
    simptoms: string[],
    severity: Severity,
    painLevel: number
}

export interface CriteriaData {
    immediate: number;
    veryUrcency: number;
    urgent: number;
    lowUrgency: number;
    nonUrgent: number;
}

export interface RecepcionistData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
    weeaklyHours: number;
}

export interface NurseData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
    coren: string;
    department: string;
    roleType: string;
    weeklyHours: number;
    onDuty: Boolean;
}

export interface DoctorData {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;
    crm: string;
    specialty: string;
    weeklyHours: number;
    onDuty: Boolean;
}

export class Convert {
    static JsonToData(json: any): PatientData {
        return {
            id: json.id,
            name: json.name,
            dob: new Date(json.dob),
            maritalStatus: json.maritalStatus,
            cpf: json.cpf,
            rg: json.rg,
            contact: json.contact,
            gender: json.gender,
            healthPlan: json.healthPlan,
            address: json.address,
        }
    };

    static JsonToTriage(json: any): TriageData {
        return {
            vitalSigns: {
                bloodPreassure: {
                    systolicPreassure: json.systolic,
                    diastolicPreassure: json.diastolic,
                },
                heartRate: json.heartRate,
                respiratoryRate: json.respiratoryRate,
                bodyTemperature: json.bodyTemperature,
                oxygenSaturation: json.oxygenSaturation
            },
            simptoms: json.simptoms,
            severity: json.severity,
            painLevel: json.painLevel
        }
    };

    static JsonToRecepcionist(json: any): RecepcionistData {
        return {
            registrationNumber: json.registrationNumber,
            name: json.name,
            cpf: json.cpf,
            contacts: json.contacts,
            hireDate: json.hireDate,
            shift: json.shift,
            salary: json.salary,
            cnesCode: json.cnesCode,
            weeaklyHours: json.weeaklyHours
        }
    };

    static JsonToNurse(json: any): NurseData {
        return {
            registrationNumber: json.registrationNumber,
            name: json.name,
            cpf: json.cpf,
            contacts: json.contacts,
            hireDate: json.hireDate,
            shift: json.shift,
            salary: json.salary,
            cnesCode: json.cnesCode,
            coren: json.coren,
            department: json.department,
            roleType: json.roleType,
            weeklyHours: json.weeaklyHours,
            onDuty: json.onDuty
        }
    };

    static JsonToDoctor(json: any): DoctorData {
        return {
            registrationNumber: json.registrationNumber,
            name: json.name,
            cpf: json.cpf,
            contacts: json.contacts,
            hireDate: json.hireDate,
            shift: json.shift,
            salary: json.salary,
            cnesCode: json.cnesCode,
            crm: json.crm,
            specialty: json.speciality,
            weeklyHours: json.weeaklyHours,
            onDuty: json.onDuty
        }
    };
}   