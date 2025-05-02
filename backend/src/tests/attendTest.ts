import { HospitalControllerTeste, PatientControllerTeste, QueueControllerTeste } from "./test";
import patient from "../Json/patientAttendRegister.json"
import { RegistrationPatient } from "../models/interfaces";

const test: RegistrationPatient = {
    attend: patient['attend'],
    patient: {
        name: patient.patient.name,
        dob: patient.patient.dob,
        maritalStatus: (patient.patient.maritalStatus),
        cpf: patient.patient.cpf,
        rg: patient.patient.rg,
        contacts: patient.patient.contacts,
        gender: patient.patient.gender,
        healthPlan: patient.patient.healthPlan,
        address: patient.patient.address
    }
};
HospitalControllerTeste.criarSenha(3);
HospitalControllerTeste.criarSenha(2);
HospitalControllerTeste.criarSenha(1);
HospitalControllerTeste.criarSenha(3);
HospitalControllerTeste.criarSenha(1);

QueueControllerTeste.callAttendTest();
PatientControllerTeste.Cadastrar(test)

QueueControllerTeste.callAttendTest();
QueueControllerTeste.callAttendTest();
QueueControllerTeste.callAttendTest();
QueueControllerTeste.callAttendTest();