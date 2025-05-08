import { QueueServices } from "../services/queueService";
import { NodeConsult } from "../utils/createNode";
import { Triage } from "../models/careFlow";
import { Patient } from "../models/patient";

const patient1: Patient = {
    name: 'Samuel',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contacts: ['123654'],
    gender: 'Male',
    healthPlan: 'sus',
    address: 'Rua doidos'
}
const patient2: Patient = {
    name: 'Teste',
    dob: new Date(2006, 3, 19),
    maritalStatus: 'Single',
    cpf: '123',
    rg: '321',
    contacts: ['123654'],
    gender: 'Male',
    healthPlan: 'sus',
    address: 'Rua doidos'
}
const triage1: Triage = {
    patient: patient1,
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
    patient: patient2,
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

const no1: NodeConsult = new NodeConsult(triage1);
const no2: NodeConsult = new NodeConsult(triage2);

QueueServices.insertConsultQueue(no1);
QueueServices.insertConsultQueue(no2);

async function time(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Teste() {
    while (true) {
        QueueServices.showQueue('consult')
        QueueServices.verify();
        await time(1000);
    } 
}

Teste()