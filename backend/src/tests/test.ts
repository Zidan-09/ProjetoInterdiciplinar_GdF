import { HospitalServices } from "../services/hospitalService";
import { HospitalManager } from "../services/hospitalManager";
import { QueueServices, typeQueue } from "../services/queueService";
import { PatientServices } from "../services/patientServices";
import { ConsultEndData, ConsultStartData, CriteriaData, RegistrationPatient, TriageData } from "../models/interfaces";
import { Consult, Triage } from "../models/careFlow";
import { ValidateRegister } from "../utils/validateRegister";
import { prisma } from "../prismaTests";

export class HospitalControllerTeste {
    static criarSenha(prioridade: number) {
        const result: string = QueueServices.createTicket(prioridade);
        return result;
    };

    static mudarCriterioSeveridade(novosCriterios: CriteriaData) {
        HospitalManager.changeCriteria(novosCriterios)

        console.log('Critérios atualizados!:', novosCriterios)
    };

    static async triagem(triagem: TriageData) {
        const result: Triage = await HospitalServices.triage(triagem);
        console.log('Triagem realizada!', result)
    };

    static async confirmarConsulta(confirmar: ConsultStartData) {
        if (confirmar.confirm) {
            const consult: [number, Date] = await HospitalServices.startConsult(confirmar);
            console.log(consult[0], consult[1]);
        } else {
            console.log('Paciente não compareceu!')
        }
    };

    static async finalizarConsult(dados: ConsultEndData) {
        const result: Consult = await HospitalServices.endConsult(dados);
        console.log('Consulta realizada:', result)
    }
};

export class PatientControllerTeste {
    static async Cadastrar(dados: RegistrationPatient) {
        let validate = ValidateRegister.verifyPatient(dados['patient']);

        if (validate) {
            let done: Boolean = await PatientServices.register(dados['patient']);

            if (done) {
                console.log('Paciente cadastrado com sucesso!');
            } else {
                console.log('Erro ao cadastrar!')
            }
        } else {
            console.log('Paciente já cadastrado!')
        }
    }
}

export class QueueControllerTeste {
    static callAttendTest() {
        const call: string = QueueServices.callNextAttend();
        console.log(call);
    };

    static callTriageTest() {
        const call: string = QueueServices.callNextTriage();
        console.log(call);
    };

    static callConsultTest() {
        const call: string = QueueServices.callNextConsult();
        console.log(call)
    };

    static seeQueue(queue: typeQueue) {
        const requestQueue: string | string[] = QueueServices.showQueue(queue);

        if (typeof requestQueue == "string") {
            console.log(requestQueue);
        } else {
            for (let i of requestQueue) {
                console.log(i);
            }
        }
    }
};

export class DataBase {
    static async patient() {
        const patients = await prisma.patient.findMany();
        return patients;
    };
}