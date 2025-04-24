import fs from 'fs';
import { MaritalStatus, Gender, Severity } from '../models/patient';

export interface PatientData {
    name: string;
  dob: Date;
  maritalStatus: MaritalStatus;
  cpf: string;
  rg: string;
  contact: string[];
  gender: Gender;
  healthPlan: string;
  address: {
    street: string,
    number: number,
    neighborhood: string
  };
}

export interface TriageData {
    bloodPreassure: {
        systolicPreassure: number,
        diastolicPreassure: number,
    },
    heartRate: number,
    respiratoryRate: number,
    bodyTemperature: number,
    oxygenSaturation: number,
    simptoms: string[],
    severity: Severity
}

export class Convert {
    static JsonToData(json: any): PatientData {
        return {
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
            bloodPreassure: {
                systolicPreassure: json.systolic,
                diastolicPreassure: json.diastolic,
            },
            heartRate: json.heartRate,
            respiratoryRate: json.respiratoryRate,
            bodyTemperature: json.bodyTemperature,
            oxygenSaturation: json.oxygenSaturation,
            simptoms: json.simptoms,
            severity: json.severity
        }
    }
}