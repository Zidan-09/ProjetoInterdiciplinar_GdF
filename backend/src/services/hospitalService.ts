import { NodeConsult, NodeRecep, NodeTriage } from "../utils/createNode";
import { QueueServices } from "./queueService";
import { criteria } from "../models/criteria";
import { Triage, StartConsult, EndConsult, TriageCategory, Reception } from "../models/careFlow";
import { Patient } from "../models/patient";
import { Consult } from "../models/hospital";

export class HospitalServices {
    static async register(data: Patient): Promise<string> {
        const no: NodeTriage = new NodeTriage(data);
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
                    search.triageCategory = 1;
                    search.limitDate = {
                        limitHours: Math.round(criteria.nonUrgent / 60),
                        limitMinuts: criteria.nonUrgent % 60
                    };
                    break;
                case 'Standard':
                    search.triageCategory = 2;
                    search.limitDate = {
                        limitHours: Math.round(criteria.standard / 60),
                        limitMinuts: criteria.standard % 60
                    };
                    break;
                case 'Urgent':
                    search.triageCategory = 3;
                    search.limitDate = {
                        limitHours: Math.round(criteria.urgent / 60),
                        limitMinuts: criteria.urgent % 60
                    };
                    break;
                case 'VeryUrgent':
                    search.triageCategory = 4;
                    search.limitDate = {
                        limitHours: Math.round(criteria.veryUrgent / 60),
                        limitMinuts: criteria.veryUrgent % 60
                    };
                    break;
                case 'Immediate':
                    search.triageCategory = 5;
                    search.limitDate = {
                        limitHours: Math.round(criteria.immediate / 60),
                        limitMinuts: criteria.immediate % 60
                    };
                    search.maxPriority = true;
                    break;
            }
        }
        return 'Severidade Alterada!'
    };

    static async startConsult(data: StartConsult): Promise<Consult> {
        const consult: Consult = new Consult(data.doctor_id, data.patient_id);
        // consult.id = await prisma.consult.create(consult.doctor_id, consult.patient_id, consult.checkInConsult);
        return consult
    };

    static async endConsult(data: EndConsult) {
        // const consult: Consult = await prisma.consult.end(data.id);
        // consult.checkOutConsult = new Date();
        // consult.diagnosis = data.diagnosis;
        // consult.prescriptions = data.prescriptions;
        // consult.notes = data.notes;
        // return consult;
    };
};