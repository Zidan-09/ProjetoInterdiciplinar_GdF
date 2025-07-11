import { NodeConsult } from "../../utils/queueUtils/createNode";
import { EndTriage } from "../../entities/careFlow";
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
    async startTriage(data: number, token: string): Promise<number|undefined> {
        try {
            const nurse_id = Jwt.verifyLoginToken(token);

            if (!nurse_id) {
                return undefined;
            }

            await db.execute("INSERT INTO Triage (triage_id, nurse_id, checkInTriage) VALUES (?, ?, NOW())", [data, nurse_id.id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.InTriage, data])
            return data;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },
    
    async endTriage(careFlow_id: number, data: EndTriage): Promise<EndTriage|undefined> {
        try {
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory WHERE name = ?', [data.triageCategory]);
            const triageCategory = result[0];
    
            await db.execute("UPDATE Triage SET checkOutTriage = NOW(), systolicPressure = ?, diastolicPressure = ?, heartRate = ?, respiratoryRate = ?, bodyTemperature = ?, oxygenSaturation = ?, painLevel = ?, symptoms = ?, triageCategory_id = ? WHERE triage_id = ?", [data.vitalSigns.bloodPressure.systolicPressure, data.vitalSigns.bloodPressure.diastolicPressure, data.vitalSigns.heartRate, data.vitalSigns.respiratoryRate, data.vitalSigns.bodyTemperature, data.vitalSigns.oxygenSaturation, data.painLevel, JSON.stringify(data.symptoms), triageCategory.id, careFlow_id]);
            await db.execute('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.WaitingConsultation, careFlow_id])
            const node: NodeConsult | undefined = await NodeConsult.create(careFlow_id, data);
    
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

    async changeTriageCategory(patientName: string, newSeverity: TriageCategory['name']): Promise<SearchResult|undefined> {
        const search = searchQueue(patientName);

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