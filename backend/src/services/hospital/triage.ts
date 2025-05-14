import { NodeConsult } from "../../utils/createNode";
import { Triage, TriageCategory } from "../../models/careFlow";
// import { db } from "../db";
import { InsertQueue } from "./../queue/services/insertQueue";
import { SearchQueue } from "./../queue/managers/searchQueue";
import { criteria } from "../../models/criteria";
import { openDb } from "../../db";

const db = openDb();

export class TriageService {
    static async triage(data: Triage) {
        // const [result]: any = await db.execute('INSERT INTO Triages (nurse_id, patient_id, vitalSigns, simptoms, painLevel, triageCategory) VALUES (?, ?, ?, ?, ?, ?)', [data.nurse_id, data.patient_id, data.vitalSigns, data.simptoms, data.painLevel, data.triageCategory]); MySQL
        const triage: any = (await db).run('INSERT INTO Triage (nurse_id, patient_id, systolicPreassure, diastolicPreassure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, painLevel, triageCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.nurse_id, data.patient_id, data.vitalSigns.bloodPreassure.systolicPreassure, data.vitalSigns.bloodPreassure.diastolicPreassure, data.vitalSigns.heartRate, data.vitalSigns.respiratoryRate, data.vitalSigns.bodyTemperature, data.vitalSigns.oxygenSaturation, data.painLevel, data.triageCategory]);
        const triageId = (await triage).lastId;

        for (let symptom of data.symptoms) {
            (await db).run('INSERT INTO Symptom (triage_id, symptom) VALUES (?, ?)', [triageId, symptom])
        };
        
        const no: NodeConsult = await NodeConsult.create(data);
        InsertQueue.insertConsultQueue(no);
        return triage;
    };

    static async changeSeverity(patient_id: number, newSeverity: TriageCategory): Promise<[boolean, string]> {
        const search: string | NodeConsult = SearchQueue.search(patient_id);

        if (typeof search === 'string') {
            return [false, search]
        } else {
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
            return [true, 'Classificação de risco alterada com sucesso']
        }
    };
};