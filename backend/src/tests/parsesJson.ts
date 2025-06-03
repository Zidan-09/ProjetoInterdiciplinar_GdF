import bulmaActivateJson from '../Json/Auth/authAccountN.json';
import bulmaJson from '../Json/Register/nurseRegister.json';
import chichiActivateJson from '../Json/Auth/authAccountR.json';
import chichiJson from '../Json/Register/recepcionistRegister.json';
import { EmployeeStatus, Gender, MaritalStatus } from '../utils/personsUtils/generalEnuns';
import gokuActivateJson from '../Json/Auth/authAccountD.json';
import gokuJson from '../Json/Register/doctorRegister.json';
import { Receptionist, Nurse, Doctor, Admin, ConfirmUser } from '../entities/hospitalStaff';
import whisActivateJson from '../Json/Auth/authAccountA.json';
import whisJson from '../Json/Register/adminRegister.json';

import patientJson from '../Json/patientRecepRegister.json';
import { CareFlow, EndConsult, StartConsult, Triage, TriageCategory } from '../entities/careFlow';

import triageJson from '../Json/triageTest.json';

import consultInitJson from '../Json/startConsult.json';
import consultEndJson from '../Json/endConsult.json';

const chichi: Receptionist = {
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
    weeklyHours: chichiJson.weeklyHours
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
    coren: bulmaJson.coren,
    department: bulmaJson.department,
    specialty: bulmaJson.specialty,
    weeklyHours: bulmaJson.weeklyHours
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
    crm: gokuJson.crm,
    specialty: gokuJson.specialty,
    weeklyHours: gokuJson.weeklyHours
}

const whis: Admin = {
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
    weeklyHours: whisJson.weeklyHours
}

const chichiActivate: ConfirmUser<Receptionist> = {
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
        weeklyHours: chichiActivateJson.data.weeklyHours
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
        coren: bulmaActivateJson.data.coren,
        department: bulmaActivateJson.data.department,
        specialty: bulmaActivateJson.data.specialty,
        weeklyHours: bulmaActivateJson.data.weeklyHours
    },
    user: {
        username: chichiActivateJson.user.username,
        password: chichiActivateJson.user.password
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
        crm: gokuActivateJson.data.crm,
        specialty: gokuActivateJson.data.specialty,
        weeklyHours: gokuActivateJson.data.weeklyHours
    },
    user: {
        username: gokuActivateJson.user.username,
        password: gokuActivateJson.user.password
    }
}

const whisActivate: ConfirmUser<Admin> = {
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
        weeklyHours: whisActivateJson.data.weeklyHours
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

const triageData: Triage = {
    careFlow_id: triageJson.careFlowId,
    nurse_id: triageJson.nurse_id,
    vitalSigns: {
        bloodPreassure: {
            systolicPreassure: triageJson.vitalSigns.bloodPreassure.systolicPreassure,
            diastolicPreassure: triageJson.vitalSigns.bloodPreassure.diastolicPreassure
        },
        heartRate: triageJson.vitalSigns.heartRate,
        respiratoryRate: triageJson.vitalSigns.respiratoryRate,
        bodyTemperature: triageJson.vitalSigns.bodyTemperature,
        oxygenSaturation: triageJson.vitalSigns.oxygenSaturation
    },
    painLevel: triageJson.painLevel,
    symptoms: triageJson.symptoms,
    triageCategory: triageJson.triageCategory as TriageCategory
}

const consultInitData: StartConsult = {
    careFlow_id: consultInitJson.careFlow_id,
    confirm: consultInitJson.confirm,
    doctor_id: consultInitJson.doctor_id
}

const consultEndData: EndConsult = {
    careFlow_id: consultEndJson.careFlow_id,
    diagnosis: consultEndJson.diagnosis,
    prescriptions: JSON.stringify(consultEndJson.prescriptions),
    notes: consultEndJson.notes
}
export { chichi, bulma, goku, whis, chichiActivate, bulmaActivate, gokuActivate, whisActivate, patientRegister, triageData, consultInitData, consultEndData }