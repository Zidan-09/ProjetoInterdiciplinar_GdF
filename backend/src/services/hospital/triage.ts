import { NodeConsult } from "../../utils/createNode";
import { Triage, TriageCategory } from "../../entities/careFlow";
import { InsertQueue } from "./../queue/services/insertQueue";
import { SearchQueue, SearchResult, SearchResultType } from "./../queue/managers/searchQueue";
import { criteria } from "../../entities/criteria";
import { openDb } from "../../db";


export class TriageService {
    static async triage(data: Triage) {
        const db = await openDb();
        const triage: any = await db.run('INSERT INTO Triage (id, nurse_id, systolicPreassure, diastolicPreassure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, painLevel, symptoms, triageCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.careFlow_id, data.nurse_id, data.vitalSigns.bloodPreassure.systolicPreassure, data.vitalSigns.bloodPreassure.diastolicPreassure, data.vitalSigns.heartRate, data.vitalSigns.respiratoryRate, data.vitalSigns.bodyTemperature, data.vitalSigns.oxygenSaturation, data.painLevel, data.symptoms, data.triageCategory]);
        const triageId = triage.lastId;

        console.log(triage.triageCategory)
        
        const no: NodeConsult = await NodeConsult.create(data);
        InsertQueue.insertConsultQueue(no);
        return data;
    };

    static async changeSeverity(careFlow_id: number, newSeverity: TriageCategory): Promise<SearchResult> {
        const search = SearchQueue.search(careFlow_id);

        if (search.status === SearchResultType.EmptyQueue || search.status === SearchResultType.NotFound) {
            return search
        } else {
            switch (newSeverity) {
                case TriageCategory.NonUrgent: 
                    search.node!.triageCategory = 1;
                    search.node!.limitDate = criteria.nonUrgent;
                    break;
                case TriageCategory.Standard:
                    search.node!.triageCategory = 2;
                    search.node!.limitDate = criteria.standard;
                    break;
                case TriageCategory.Urgent:
                    search.node!.triageCategory = 3;
                    search.node!.limitDate = criteria.urgent;
                    break;
                case TriageCategory.VeryUrgent:
                    search.node!.triageCategory = 4;
                    search.node!.limitDate = criteria.veryUrgent;
                    break;
                case TriageCategory.Immediate:
                    search.node!.triageCategory = 5;
                    search.node!.limitDate = criteria.immediate
                    search.node!.maxPriority = true;
                    break;
            }
            return search
        }
    };
};