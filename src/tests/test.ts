import { HospitalFunctions } from "../services/hospitalService";
import { QueueFunctions } from "../services/queueService";
import { PatientFunctions } from "../services/patientServices";
import { typeQueue } from "../services/queueService";
import { Patient, Severity } from "../models/patient";

let patient: Patient;

PatientFunctions.register({
    name: 'Samuel da Penha Nascimento',
    dob: new Date(2006, 4, 19),
    maritalStatus: 'Single',
    cpf: '100.165.043-30',
    rg: '8329043',
    contact: ['(86)9 9427-9321', '(86)9 9451-5453'],
    gender: 'Male',
    healthPlan: 'Sus',
    address: 'Av Pinheiro Machado, 1209'
})

PatientFunctions.register({
    name: 'Gabriel Lima Silva Oliveira',
    dob: new Date(2005, 7, 7),
    maritalStatus: 'Single',
    cpf: '100.165.043-30',
    rg: '0923465',
    contact: ['(86)9 9448-3184'],
    gender: 'Other',
    healthPlan: 'Sus',
    address: 'Rua dos catapimba, 1010'
})

// QueueFunctions.showQueue('triage')

patient = QueueFunctions.callNextTriage()
HospitalFunctions.triage(patient, 'Non-urgent', {
    systolic: 120,
    diastolic: 80,
    heartRate: 80,
    respiratoryRate: 50,
    bodyTemperature: 36,
    oxygenSaturation: 73
})

patient = QueueFunctions.callNextTriage()
HospitalFunctions.triage(patient, 'Low-urgency', {
    systolic: 250,
    diastolic: 210,
    heartRate: 400,
    respiratoryRate: 50,
    bodyTemperature: 40,
    oxygenSaturation: 90
})
QueueFunctions.showQueue('consult')

QueueFunctions.callNextConsult();
QueueFunctions.callNextConsult();