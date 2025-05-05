import { NodeConsult } from "../utils/createNoConsult";
import { QueueServices } from "./queueService";
import { criteria } from "../models/criteria";
import { Triage, StartConsult, EndConsult, TriageCategory, Reception } from "../models/careFlow";
import { Patient } from "../models/patient";
import { NodeTriage } from "../utils/createNoTriage";

export class HospitalServices {
    static async register(data: Reception['patient']): Promise<string> {
        const no: NodeTriage = new NodeTriage(data.name);
        QueueServices.insertTriageQueue(no);
    
        // const patient = await prisma.patient.create({
        //     data: {
        //         name: data.name,
        //         dob: new Date(data.dob),
        //         maritalStatus: data.maritalStatus,
        //         cpf: data.cpf,
        //         rg: data.rg,
        //         contacts: data.contacts,
        //         gender: data.gender,
        //         healthPlan: data.healthPlan,
        //         address: data.address,
        //     }
        // });
    
        return 'Paciente Cadastrado com Sucesso!';
    };

    static async triage(data: Triage) { // Promise<Triage>    ESPERAR BANCO DE DADOS
        // const triage: Triage = await prisma.triage.create(data)

        // const no: NoConsult = new NoConsult(triage);
        // QueueServices.insertConsultQueue(no);
        // return triage;
    };

    static async changeSeverity(patient_id: number, newSeverity: TriageCategory): Promise<string> {
        const search = QueueServices.search(patient_id);

        if (search == undefined) {
            return 'Erro'
        } else {
            search!.triage.triageCategory = newSeverity;

            switch (newSeverity) {
                case 'Non-Urgent': 
                    search.severity = 1;
                    search.limit = criteria.nonUrgent;
                    break;
                case 'Standard':
                    search.severity = 2;
                    search.limit = criteria.standard;
                    break;
                case 'Urgent':
                    search.severity = 3;
                    search.limit = criteria.urgent;
                    break;
                case 'VeryUrgent':
                    search.severity = 4;
                    search.limit = criteria.veryUrgent;
                    break;
                case 'Immediate':
                    search.severity = 5;
                    search.limit = criteria.immediate;
                    break;
            }
        }
        return 'Severidade Alterada!'
    };

    static async startConsult(data: StartConsult) { //Promise<[number, Date]>
        // const consult: Consult = await prisma.consult.create(data);
        // return [consult.id!, consult.checkInConsult];
    };

    static async endConsult(data: EndConsult) { // Promise<Consult>
    //     const consult: Consult = await prisma.consult.end(data.consult_id);
    //     consult.checkOutConsult = new Date();
    //     consult.diagnosis = data.diagnosis;
    //     consult.prescriptions = data.prescriptions;
    //     consult.notes = data.notes;
    //     return consult;
    };
};