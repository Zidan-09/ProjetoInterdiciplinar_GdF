import bulmaActivateJson from '../Json/Auth/authAccountN.json';
import bulmaJson from '../Json/Register/nurseRegister.json';
import chichiActivateJson from '../Json/Auth/authAccountR.json';
import chichiJson from '../Json/Register/recepcionistRegister.json';
import { EmployeeStatus, EmployeeType, Gender, MaritalStatus } from '../utils/personsUtils/generalEnuns';
import gokuActivateJson from '../Json/Auth/authAccountD.json';
import gokuJson from '../Json/Register/doctorRegister.json';
import { Employee, Nurse, Doctor, ConfirmUser } from '../entities/hospitalStaff';
import whisActivateJson from '../Json/Auth/authAccountA.json';
import whisJson from '../Json/Register/adminRegister.json';

import patientJson from '../Json/careFlow/patientRegister.json';
import { CareFlow, EndConsult, StartConsult, StartTriage, EndTriage, TriageCategory } from '../entities/careFlow';

import triageInitJson from '../Json/careFlow/startTriage.json';
import triageEndJson from '../Json/careFlow/endTriage.json';

import consultInitJson from '../Json/careFlow/startConsult.json';
import consultEndJson from '../Json/careFlow/endConsult.json';

const chichi: Employee = {
    registrationNumber: chichiJson.registrationNumber,
    name: chichiJson.name,
    cpf: chichiJson.cpf,
    email: chichiJson.email,
    phone: chichiJson.phone,
    dob: new Date(chichiJson.dob),
    address: chichiJson.address,
    workShift: chichiJson.workShift,
    status: chichiJson.status as EmployeeStatus,
    salary: chichiJson.salary,
    cnesCode: chichiJson.cnesCode,
    accessLevel: chichiJson.accessLevel,
    weeklyHours: chichiJson.weeklyHours,
    role: chichiJson.role as EmployeeType
};

const bulma: Nurse = {
    registrationNumber: bulmaJson.registrationNumber,
    name: bulmaJson.name,
    cpf: bulmaJson.cpf,
    email: bulmaJson.email,
    phone: bulmaJson.phone,
    dob: new Date(bulmaJson.dob),
    address: bulmaJson.address,
    workShift: bulmaJson.workShift,
    status: bulmaJson.status as EmployeeStatus,
    salary: bulmaJson.salary,
    cnesCode: bulmaJson.cnesCode,
    accessLevel: bulmaJson.accessLevel,
    weeklyHours: bulmaJson.weeklyHours,
    role: bulmaJson.role as EmployeeType,
    coren: bulmaJson.coren,
    department: bulmaJson.department,
    specialty: bulmaJson.specialty
}

const goku: Doctor = {
    registrationNumber: gokuJson.registrationNumber,
    name: gokuJson.name,
    cpf: gokuJson.cpf,
    email: gokuJson.email,
    phone: gokuJson.phone,
    dob: new Date(gokuJson.dob),
    address: gokuJson.address,
    workShift: gokuJson.workShift,
    status: gokuJson.status as EmployeeStatus,
    salary: gokuJson.salary,
    cnesCode: gokuJson.cnesCode,
    accessLevel: gokuJson.accessLevel,
    weeklyHours: gokuJson.weeklyHours,
    role: gokuJson.role as EmployeeType,
    crm: gokuJson.crm,
    specialty: gokuJson.specialty
}

const whis: Employee = {
    registrationNumber: whisJson.registrationNumber,
    name: whisJson.name,
    cpf: whisJson.cpf,
    email: whisJson.email,
    phone: whisJson.phone,
    dob: new Date(whisJson.dob),
    address: whisJson.address,
    workShift: whisJson.workShift,
    status: whisJson.status as EmployeeStatus,
    salary: whisJson.salary,
    cnesCode: whisJson.cnesCode,
    accessLevel: whisJson.accessLevel,
    weeklyHours: whisJson.weeklyHours,
    role: whisJson.role as EmployeeType
}

const chichiActivate: ConfirmUser<Employee> = {
    data: {
        registrationNumber: chichiActivateJson.data.registrationNumber,
        name: chichiActivateJson.data.name,
        cpf: chichiActivateJson.data.cpf,
        email: chichiActivateJson.data.email,
        phone: chichiActivateJson.data.phone,
        dob: new Date(chichiActivateJson.data.dob),
        address: chichiActivateJson.data.address,
        workShift: chichiActivateJson.data.workShift,
        status: chichiActivateJson.data.status as EmployeeStatus,
        salary: chichiActivateJson.data.salary,
        cnesCode: chichiActivateJson.data.cnesCode,
        accessLevel: chichiActivateJson.data.accessLevel,
        weeklyHours: chichiActivateJson.data.weeklyHours,
        role: chichiActivateJson.data.role as EmployeeType
    },
    user: {
        username: chichiActivateJson.user.username,
        password: chichiActivateJson.user.password
    }
}

const bulmaActivate: ConfirmUser<Nurse> = {
    data: {
        registrationNumber: bulmaActivateJson.data.registrationNumber,
        name: bulmaActivateJson.data.name,
        cpf: bulmaActivateJson.data.cpf,
        email: bulmaActivateJson.data.email,
        phone: bulmaActivateJson.data.phone,
        dob: new Date(bulmaActivateJson.data.dob),
        address: bulmaActivateJson.data.address,
        workShift: bulmaActivateJson.data.workShift,
        status: bulmaActivateJson.data.status as EmployeeStatus,
        salary: bulmaActivateJson.data.salary,
        cnesCode: bulmaActivateJson.data.cnesCode,
        accessLevel: bulmaActivateJson.data.accessLevel,
        weeklyHours: bulmaActivateJson.data.weeklyHours,
        role: bulmaActivateJson.data.role as EmployeeType,
        coren: bulmaActivateJson.data.coren,
        department: bulmaActivateJson.data.department,
        specialty: bulmaActivateJson.data.specialty
    },
    user: {
        username: bulmaActivateJson.user.username,
        password: bulmaActivateJson.user.password
    }
}

const gokuActivate: ConfirmUser<Doctor> = {
    data: {
        registrationNumber: gokuActivateJson.data.registrationNumber,
        name: gokuActivateJson.data.name,
        cpf: gokuActivateJson.data.cpf,
        email: gokuActivateJson.data.email,
        phone: gokuActivateJson.data.phone,
        dob: new Date(gokuActivateJson.data.dob),
        address: gokuActivateJson.data.address,
        workShift: gokuActivateJson.data.workShift,
        status: gokuActivateJson.data.status as EmployeeStatus,
        salary: gokuActivateJson.data.salary,
        cnesCode: gokuActivateJson.data.cnesCode,
        accessLevel: gokuActivateJson.data.accessLevel,
        weeklyHours: gokuActivateJson.data.weeklyHours,
        role: gokuActivateJson.data.role as EmployeeType,
        crm: gokuActivateJson.data.crm,
        specialty: gokuActivateJson.data.specialty,
    },
    user: {
        username: gokuActivateJson.user.username,
        password: gokuActivateJson.user.password
    }
}

const whisActivate: ConfirmUser<Employee> = {
    data: {
        registrationNumber: whisActivateJson.data.registrationNumber,
        name: whisActivateJson.data.name,
        cpf: whisActivateJson.data.cpf,
        email: whisActivateJson.data.email,
        phone: whisActivateJson.data.phone,
        dob: new Date(whisActivateJson.data.dob),
        address: whisActivateJson.data.address,
        workShift: whisActivateJson.data.workShift,
        status: whisActivateJson.data.status as EmployeeStatus,
        salary: whisActivateJson.data.salary,
        cnesCode: whisActivateJson.data.cnesCode,
        accessLevel: whisActivateJson.data.accessLevel,
        weeklyHours: whisActivateJson.data.weeklyHours,
        role: whisActivateJson.data.role as EmployeeType
    },
    user: {
        username: whisActivateJson.user.username,
        password: whisActivateJson.user.password
    }
}

const patientRegister: CareFlow = {
    receptionist_id: patientJson.receptionist_id,
    patient: {
        name: patientJson.patient.name,
        dob: new Date(patientJson.patient.dob),
        maritalStatus: patientJson.patient.maritalStatus as MaritalStatus,
        cpf: patientJson.patient.cpf,
        rg: patientJson.patient.rg,
        contact: patientJson.patient.contact,
        gender: patientJson.patient.gender as Gender,
        healthPlan: patientJson.patient.healthPlan,
        address: patientJson.patient.address
    }
}

const triageInitData: StartTriage = {
    careFlow_id: triageInitJson.careFlow_id,
    nurse_id: triageInitJson.nurse_id,
}

const triageEndData: EndTriage = {
    careFlow_id: triageEndJson.careFlowId,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: triageEndJson.vitalSigns.bloodPreassure.systolicPreassure,
            diastolicPreassure: triageEndJson.vitalSigns.bloodPreassure.diastolicPreassure
        },
        heartRate: triageEndJson.vitalSigns.heartRate,
        respiratoryRate: triageEndJson.vitalSigns.respiratoryRate,
        bodyTemperature: triageEndJson.vitalSigns.bodyTemperature,
        oxygenSaturation: triageEndJson.vitalSigns.oxygenSaturation
    },
    painLevel: triageEndJson.painLevel,
    symptoms: triageEndJson.symptoms,
    triageCategory: triageEndJson.triageCategory as TriageCategory
}

const consultInitData: StartConsult = {
    careFlow_id: consultInitJson.careFlow_id,
    confirm: consultInitJson.confirm,
    doctor_id: consultInitJson.doctor_id
}

const consultEndData: EndConsult = {
    careFlow_id: consultEndJson.careFlow_id,
    diagnosis: consultEndJson.diagnosis,
    prescriptions: consultEndJson.prescriptions,
    notes: consultEndJson.notes
}
export { chichi, bulma, goku, whis, chichiActivate, bulmaActivate, gokuActivate, whisActivate, patientRegister, triageInitData, triageEndData, consultInitData, consultEndData }