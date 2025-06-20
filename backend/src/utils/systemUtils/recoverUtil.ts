import { RowDataPacket } from "mysql2";
import { db } from "../../db";
import { EndTriage } from "../../entities/careFlow";

export async function searchTriage(careFlow_id: number) {
    try {
        const [TriageData] = await db.execute<RowDataPacket[]>('SELECT Triage.* FROM CareFlow JOIN Triage ON Triage.triage_id = CareFlow.id WHERE CareFlow.id = ?', [careFlow_id]);
        const Triage = TriageData[0];
        
        const data: EndTriage = {
            vitalSigns: {
                bloodPressure: {
                    systolicPressure: Triage.vitalSigns.bloodPressure.systolicPreassure,
                    diastolicPressure: Triage.vitalSigns.bloodPressure.diastolicPreassure
                },
                heartRate: Triage.vitalSigns.heartRate,
                respiratoryRate: Triage.vitalSigns.respiratoryRate,
                bodyTemperature: Triage.vitalSigns.bodyTemperature,
                oxygenSaturation: Triage.vitalSigns.oxygenSaturation
            },
            triageCategory: Triage.triageCategory,
            symptoms: Triage.symptoms,
            painLevel: Triage.painLevel
        }
        return data;
        
    } catch (error) {
        console.error(error);
    }
}