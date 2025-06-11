import { NodeConsult } from "../../utils/queueUtils/createNode";
import { EndTriage, StartTriage } from "../../entities/careFlow";
import { Status } from "../../utils/personsUtils/generalEnuns";
import { SearchQueue, SearchResult } from "./../queue/managers/searchQueue";
import { openDb } from "../../db";
import { QueueResponses } from "../../utils/queueUtils/queueEnuns";
import { ConsultQueue } from "../../entities/queue";
import { TriageCategory } from "../../entities/triageCategory";
import { TriageCategoryManager } from "../adm/triageCategoryManager";


export class TriageService {
    static async startTriage(data: StartTriage) {
        const db = await openDb();
        await db.run("INSERT INTO Triage (triage_id, nurse_id, checkInTriage) VALUES (?, ?, datetime('now'))", [data.careFlow_id, data.nurse_id]);
        await db.run('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InTriage, data.careFlow_id])
        return data;
    };
    
    static async endTriage(data: EndTriage) {
        const db = await openDb();

        console.log(data);

        const triageCategory = await db.get('SELECT * FROM TriageCategory WHERE name = ?', [data.triageCategory]);

        await db.run("UPDATE Triage SET checkOutTriage = datetime('now'), systolicPreassure = ?, diastolicPreassure = ?, heartRate = ?, respiratoryRate = ?, bodyTemperature = ?, oxygenSaturation = ?, painLevel = ?, symptoms = ?, triageCategory_id = ? WHERE triage_id = ?", [data.vitalSigns.bloodPreassure.systolicPreassure, data.vitalSigns.bloodPreassure.diastolicPreassure, data.vitalSigns.heartRate, data.vitalSigns.respiratoryRate, data.vitalSigns.bodyTemperature, data.vitalSigns.oxygenSaturation, data.painLevel, JSON.stringify(data.symptoms), triageCategory.id, data.careFlow_id]);
        await db.run('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.WaitingConsultation, data.careFlow_id])
        const node: NodeConsult = await NodeConsult.create(data);
        ConsultQueue.insertQueue(node);
        return data;
    }

    static async changeTriageCategory(careFlow_id: number, newSeverity: TriageCategory['name']): Promise<SearchResult> {
        const search = SearchQueue.search(careFlow_id);

        if (search.status === QueueResponses.EmptyQueue || search.status === QueueResponses.NotFound) {
            return search;

        } else {
            const triageCategory = await TriageCategoryManager.findByName(newSeverity);

            search.node!.triageCategory = triageCategory.priority;
            search.node!.limitDate = new Date(search.node!.time.getTime() + triageCategory.limitMinutes * 60000);
            return search
        }
    };
};