import { HospitalServices } from "../services/hospitalService";
import { QueueServices } from "../services/queueService";
import { PatientRegistration } from "../services/patientServices";
import { typeQueue } from "../services/queueService";
import { Patient, Severity } from "../models/patient";

let patient: Patient;

PatientRegistration.register({
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

PatientRegistration.register({
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

QueueServices.showQueue('triage')

patient = QueueServices.callNextTriage()
HospitalServices.triage(patient, 'Non-urgent', ['tosse', 'espirros'], {
    systolic: 120,
    diastolic: 80,
    heartRate: 80,
    respiratoryRate: 50,
    bodyTemperature: 36,
    oxygenSaturation: 73
})
console.log(patient)

patient = QueueServices.callNextTriage()
HospitalServices.triage(patient, 'Low-urgency', ['dor abdominal'], {
    systolic: 250,
    diastolic: 210,
    heartRate: 400,
    respiratoryRate: 50,
    bodyTemperature: 40,
    oxygenSaturation: 90
})
QueueServices.showQueue('consult')

QueueServices.callNextConsult();
QueueServices.callNextConsult();