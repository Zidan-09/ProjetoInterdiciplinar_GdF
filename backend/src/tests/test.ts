import { AdminControllerTest, EmployersConstrollerTest } from "./ControllersForTest/hospitalStaffController";
import { HospitalControllerTest } from "./ControllersForTest/hospitalControllerTest";
import { queueControllerTest } from "./ControllersForTest/queueControllerTest";
import { Receptionist, Nurse, Doctor, Admin } from "../entities/hospitalStaff";
import { EmployeeStatus } from "../utils/personsUtils/generalEnuns";

import chichiJson from '../Json/recepcionistRegister.json';
import bulmaJson from '../Json/nurseRegister.json';
import gokuJson from '../Json/doctorRegister.json';
import whisJson from '../Json/adminRegister.json';

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
    
}

async function start() {
    await EmployersConstrollerTest.register(chichi);
    await EmployersConstrollerTest.register(bulma);
    await EmployersConstrollerTest.register(goku);
    await EmployersConstrollerTest.register(whis);
}