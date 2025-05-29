import { NodeConsult } from "../../utils/queueUtils/createNode";
import { Status, Triage, TriageCategory } from "../../entities/careFlow";
import { SearchQueue, SearchResult } from "./../queue/managers/searchQueue";
import { criteria } from "../../entities/criteria";
import { openDb } from "../../db";
import { QueueReturns } from "../../utils/queueUtils/queueEnuns";
import { ConsultQueue } from "../../entities/queue";


export class TriageService {
    static async triage(data: Triage) {
        const db = await openDb();
        await db.run('INSERT INTO Triage (triage_id, nurse_id, systolicPreassure, diastolicPreassure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, painLevel, symptoms, triageCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.careFlow_id, data.nurse_id, data.vitalSigns.bloodPreassure.systolicPreassure, data.vitalSigns.bloodPreassure.diastolicPreassure, data.vitalSigns.heartRate, data.vitalSigns.respiratoryRate, data.vitalSigns.bodyTemperature, data.vitalSigns.oxygenSaturation, data.painLevel, data.symptoms, data.triageCategory]);
        await db.run('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.WaitingConsultation, data.careFlow_id])
        const node: NodeConsult = await NodeConsult.create(data);
        ConsultQueue.insertQueue(node);
        return data;
    };

    static async changeSeverity(careFlow_id: number, newSeverity: TriageCategory): Promise<SearchResult> {
        const search = SearchQueue.search(careFlow_id);

        if (search.status === QueueReturns.EmptyQueue || search.status === QueueReturns.NotFound) {
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