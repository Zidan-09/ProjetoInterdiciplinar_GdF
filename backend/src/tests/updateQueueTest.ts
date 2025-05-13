import { NodeConsult } from "../utils/createNode";
import { Triage } from "../models/careFlow";
import { Patient } from "../models/patient";
import { InsertQueue } from "../services/queue/services/insertQueue";
import { ShowQueue } from "../services/queue/services/showQueue";
import { PatientCaller } from "../services/queue/services/patientCaller";

const patient1: Patient = {
    name: 'Samuel',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contact: '123654',
    gender: 'Male',
    healthPlan: 'sus',
    address: 'Rua doidos'
}
const patient2: Patient = {
    name: 'João',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contact: '123654',
    gender: 'Male',
    healthPlan: 'sus',
    address: 'Rua doidos'
}
const patient3: Patient = {
    name: 'Milena',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contact: '123654',
    gender: 'Female',
    healthPlan: 'sus',
    address: 'Rua doidos'
}
const patient4: Patient = {
    name: 'Marco',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contact: '123654',
    gender: 'Male',
    healthPlan: 'sus',
    address: 'Rua doidos'
}
const patient5: Patient = {
    name: 'Ruan',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contact: '123654',
    gender: 'Male',
    healthPlan: 'sus',
    address: 'Rua doidos'
}

const triage1: Triage = {
    patient_id: 1,
    nurse_id: 1,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: 120,
            diastolicPreassure: 80
        },
        heartRate: 120,
        respiratoryRate: 80,
        bodyTemperature: 36,
        oxygenSaturation: 90
    },
    simptoms: ['Tosse'],
    triageCategory: 'VeryUrgent',
    painLevel: 5
}
const triage2: Triage = {
    patient_id: 2,
    nurse_id: 1,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: 120,
            diastolicPreassure: 80
        },
        heartRate: 120,
        respiratoryRate: 80,
        bodyTemperature: 36,
        oxygenSaturation: 90
    },
    simptoms: ['Tosse'],
    triageCategory: 'Non-Urgent',
    painLevel: 1
}
const triage3: Triage = {
    patient_id: 3,
    nurse_id: 1,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: 120,
            diastolicPreassure: 80
        },
        heartRate: 120,
        respiratoryRate: 80,
        bodyTemperature: 36,
        oxygenSaturation: 90
    },
    simptoms: ['Tosse'],
    triageCategory: 'Urgent',
    painLevel: 1
}
const triage4: Triage = {
    patient_id: 4,
    nurse_id: 1,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: 120,
            diastolicPreassure: 80
        },
        heartRate: 120,
        respiratoryRate: 80,
        bodyTemperature: 36,
        oxygenSaturation: 90
    },
    simptoms: ['Tosse'],
    triageCategory: 'Standard',
    painLevel: 1
}
const triage5: Triage = {
    patient_id: 5,
    nurse_id: 1,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: 120,
            diastolicPreassure: 80
        },
        heartRate: 120,
        respiratoryRate: 80,
        bodyTemperature: 36,
        oxygenSaturation: 90
    },
    simptoms: ['Tosse'],
    triageCategory: 'VeryUrgent',
    painLevel: 1
}

const no1: NodeConsult = new NodeConsult(triage1);
const no2: NodeConsult = new NodeConsult(triage2);
const no3: NodeConsult = new NodeConsult(triage3);
const no4: NodeConsult = new NodeConsult(triage4);
const no5: NodeConsult = new NodeConsult(triage5);

InsertQueue.insertConsultQueue(no1);
InsertQueue.insertConsultQueue(no2);
InsertQueue.insertConsultQueue(no3);
InsertQueue.insertConsultQueue(no4);
InsertQueue.insertConsultQueue(no5);

ShowQueue.showQueue('consult');

console.log(PatientCaller.callNextConsult());