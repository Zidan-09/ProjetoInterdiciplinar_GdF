import { NodeConsult } from "../../utils/queueUtils/createNode";
import { EndTriage, StartTriage } from "../../entities/careFlow";
import { Status } from "../../utils/enuns/generalEnuns";
import { searchQueue, SearchResult } from "./../queue/managers/searchQueue";
import { db } from "../../db";
import { QueueResponses } from "../../utils/enuns/allResponses";
import { ConsultQueue } from "../../entities/queue";
import { TriageCategory } from "../../entities/triageCategory";
import { TriageCategoryManager } from "../adm/triageCategoryManager";
import { RowDataPacket } from "mysql2";
import { Jwt } from "../../utils/systemUtils/security";


export const TriageService = {
    async startTriage(data: StartTriage, token: string): Promise<StartTriage|undefined> {
        try {
            const nurse_id = Jwt.verifyLoginToken(token);

            if (!nurse_id) {
                return undefined;
            }

            await db.execute("INSERT INTO Triage (triage_id, nurse_id, checkInTriage) VALUES (?, ?, NOW())", [data.careFlow_id, nurse_id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InTriage, data.careFlow_id])
            return data;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },
    
    async endTriage(data: EndTriage): Promise<EndTriage|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory WHERE name = ?', [data.triageCategory]);
            const triageCategory = result[0];
    
            await db.execute("UPDATE Triage SET checkOutTriage = NOW(), systolicPreassure = ?, diastolicPreassure = ?, heartRate = ?, respiratoryRate = ?, bodyTemperature = ?, oxygenSaturation = ?, painLevel = ?, symptoms = ?, triageCategory_id = ? WHERE triage_id = ?", [data.vitalSigns.bloodPreassure.systolicPreassure, data.vitalSigns.bloodPreassure.diastolicPreassure, data.vitalSigns.heartRate, data.vitalSigns.respiratoryRate, data.vitalSigns.bodyTemperature, data.vitalSigns.oxygenSaturation, data.painLevel, JSON.stringify(data.symptoms), triageCategory.id, data.careFlow_id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.WaitingConsultation, data.careFlow_id])
            const node: NodeConsult | undefined = await NodeConsult.create(data);
    
            if (!node) {
                return undefined;
            }
            
            ConsultQueue.insertQueue(node);
            return data;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async changeTriageCategory(careFlow_id: number, newSeverity: TriageCategory['name']): Promise<SearchResult|undefined> {
        const search = searchQueue(careFlow_id);

        if (search.status === QueueResponses.EmptyQueue || search.status === QueueResponses.NotFound) {
            return search;

        } else {
            const triageCategory: any = await TriageCategoryManager.findByName(newSeverity);

            if (triageCategory) {
                search.node!.triageCategory = triageCategory.priority;
                search.node!.limitDate = new Date(search.node!.time.getTime() + triageCategory.limitDate * 60000);
                return search
            }
        }
    }
};