import { HospitalControllerTeste, PatientControllerTeste, QueueControllerTeste } from "./test";
import patient from "../Json/patientAttendRegister.json"
import triage from "../Json/triageTest.json";
import initConsult from "../Json/startConsult.json";
import endConsult from "../Json/endConsult.json";
import { ConsultEndData, ConsultStartData, RegistrationPatient, TriageData } from "../models/interfaces";
import { Gender, MaritalStatus } from "../models/patient";
import { Severity } from "../models/careFlow";
import { attendQueue, triageQueue } from "../services/queueService";
import { consults, triages } from "../prismaTests";

const paciente: RegistrationPatient = {
    attend: patient['attend'],
    patient: {
        name: patient.patient.name,
        dob: patient.patient.dob,
        maritalStatus: patient.patient.maritalStatus as MaritalStatus,
        cpf: patient.patient.cpf,
        rg: patient.patient.rg,
        contacts: patient.patient.contacts,
        gender: patient.patient.gender as Gender,
        healthPlan: patient.patient.healthPlan,
        address: patient.patient.address
    }
};

const triagem: TriageData = {
    nurse_id: triage.nurse_id,
    patient: triage.patient,
    vitalSigns: triage.vitalSigns,
    severity: triage.severity as Severity,
    simptoms: triage.simptoms,
    painLevel: triage.painLevel
};

const startC: ConsultStartData = {
    doctor_id: initConsult.doctor_id,
    confirm: initConsult.confirm
};

const endC: ConsultEndData = {
    consult_id: endConsult.consult_id,
    diagnosis: endConsult.diagnosis,
    prescriptions: endConsult.prescriptions,
    notes: endConsult.notes
}
async function rodarTeste() {
    HospitalControllerTeste.criarSenha(3);
    HospitalControllerTeste.criarSenha(2);
    HospitalControllerTeste.criarSenha(2);
    HospitalControllerTeste.criarSenha(2);
    HospitalControllerTeste.criarSenha(3);
    HospitalControllerTeste.criarSenha(1);

    QueueControllerTeste.seeQueue('attend');
    
    QueueControllerTeste.callAttendTest();

    await PatientControllerTeste.Cadastrar(paciente);
    QueueControllerTeste.seeQueue('triage');
    
    QueueControllerTeste.callTriageTest();
    console.log(triages, consults)
    await HospitalControllerTeste.triagem(triagem);
    console.log(triages, consults)
    QueueControllerTeste.seeQueue('consult');

    // HospitalControllerTeste.confirmarConsulta(startC);
    // HospitalControllerTeste.finalizarConsult(endC);
}

rodarTeste();